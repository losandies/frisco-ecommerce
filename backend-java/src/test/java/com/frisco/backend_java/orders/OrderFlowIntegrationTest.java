package com.frisco.backend_java.orders;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.math.BigDecimal;
import java.util.UUID;

import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import com.frisco.backend_java.models.Product;
import com.frisco.backend_java.repositories.OrderRepository;
import com.frisco.backend_java.repositories.ProductRepository;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@SpringBootTest(properties = {
    "spring.datasource.url=jdbc:h2:mem:order-tests;DB_CLOSE_DELAY=-1",
    "spring.datasource.username=sa",
    "spring.datasource.password=",
    "spring.datasource.driver-class-name=org.h2.Driver",
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "spring.jpa.show-sql=false"
})
@AutoConfigureMockMvc
@Transactional
class OrderFlowIntegrationTest {
    @Autowired MockMvc mvc;
    @Autowired ObjectMapper json;
    @Autowired ProductRepository products;
    @Autowired OrderRepository orders;
    @Autowired EntityManager entityManager;

    @Test
    void placesOrderUsingCatalogPricesAndPersistsSnapshots() throws Exception {
        MockHttpSession session = registerAndLogin("snapshot");
        Product product = products.saveAndFlush(new Product("Original name", "Brand", "clothing",
            "shirts", new BigDecimal("34.99"), "shirt.jpeg"));
        String body = "{\"items\":[{\"id\":" + product.getId()
            + ",\"quantity\":2,\"size\":\"XL\",\"price\":\"0.01\"}]}";

        MvcResult result = place(session, body, 201);
        JsonNode order = json.readTree(result.getResponse().getContentAsString());
        UUID orderId = UUID.fromString(order.get("id").asText());
        assertEquals(new BigDecimal("79.18"), order.get("total").decimalValue());
        assertEquals(new BigDecimal("34.99"), order.get("items").get(0).get("price").decimalValue());
        assertNotNull(order.get("createdAt"));

        // Change then remove the catalog record; history must retain the purchase snapshot.
        entityManager.createQuery("update Product p set p.name = :name, p.price = :price where p.id = :id")
            .setParameter("name", "Changed name").setParameter("price", new BigDecimal("1.00"))
            .setParameter("id", product.getId()).executeUpdate();
        products.deleteById(product.getId());
        entityManager.flush();
        entityManager.clear();

        assertTrue(orders.existsById(orderId));
        mvc.perform(get("/api/orders/allOrders").session(session))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].items[0].name").value("Original name"))
            .andExpect(jsonPath("$[0].items[0].price").value(34.99))
            .andExpect(jsonPath("$[0].items[0].quantity").value(2));
        mvc.perform(get("/api/users/getCurrentUser").session(session))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.orders[0].id").value(orderId.toString()))
            .andExpect(jsonPath("$.password").doesNotExist());
    }

    @Test
    void roundsDemoTaxHalfUpAndPreservesRepeatedProductLines() throws Exception {
        MockHttpSession session = registerAndLogin("rounding");
        Product product = products.saveAndFlush(new Product("Small item", "Brand", "accessories",
            "rings", new BigDecimal("0.25"), "ring.jpeg"));
        MvcResult result = place(session, "{\"items\":[{\"id\":" + product.getId()
            + ",\"quantity\":1,\"size\":\"S\"}]}", 201);
        assertEquals(new BigDecimal("5.27"),
            json.readTree(result.getResponse().getContentAsString()).get("total").decimalValue());

        MvcResult repeated = place(session, "{\"items\":[{\"id\":" + product.getId()
            + ",\"quantity\":1,\"size\":\"S\"},{\"id\":" + product.getId()
            + ",\"quantity\":2,\"size\":\"L\"}]}", 201);
        JsonNode saved = json.readTree(repeated.getResponse().getContentAsString());
        assertEquals(2, saved.get("items").size());
        assertEquals("S", saved.get("items").get(0).get("size").asText());
        assertEquals("L", saved.get("items").get(1).get("size").asText());
        assertEquals(0, new BigDecimal("5.80").compareTo(saved.get("total").decimalValue()));
        UUID id = UUID.fromString(saved.get("id").asText());
        entityManager.flush();
        entityManager.clear();
        var reloaded = orders.findById(id).orElseThrow();
        assertEquals("S", reloaded.getItems().get(0).getSize());
        assertEquals("L", reloaded.getItems().get(1).getSize());
    }

    @Test
    void historyIsNewestFirstAndRestrictedToOwner() throws Exception {
        MockHttpSession owner = registerAndLogin("owner");
        MockHttpSession other = registerAndLogin("other");
        Product product = products.findAll().getFirst();
        String body = "{\"items\":[{\"id\":" + product.getId() + ",\"quantity\":1,\"size\":\"M\"}]}";
        UUID first = UUID.fromString(json.readTree(place(owner, body, 201).getResponse()
            .getContentAsString()).get("id").asText());
        // Set a deterministic older timestamp rather than relying on the clock's resolution.
        entityManager.createQuery("update Order o set o.createdAt = :time where o.id = :id")
            .setParameter("time", java.time.Instant.parse("2020-01-01T00:00:00Z"))
            .setParameter("id", first).executeUpdate();
        UUID second = UUID.fromString(json.readTree(place(owner, body, 201).getResponse()
            .getContentAsString()).get("id").asText());
        entityManager.flush();
        entityManager.clear();

        mvc.perform(get("/api/orders/allOrders").session(owner))
            .andExpect(status().isOk()).andExpect(jsonPath("$.length()").value(2))
            .andExpect(jsonPath("$[0].id").value(second.toString()))
            .andExpect(jsonPath("$[1].id").value(first.toString()));
        mvc.perform(get("/api/orders/allOrders").session(other))
            .andExpect(status().isOk()).andExpect(content().json("[]"));
        mvc.perform(get("/api/users/getCurrentUser").session(other))
            .andExpect(status().isOk()).andExpect(jsonPath("$.orders").isEmpty());
    }

    @Test
    void rejectsUnavailableProductsWithoutSavingAnOrder() throws Exception {
        MockHttpSession session = registerAndLogin("missing-product");
        long before = orders.count();
        int valid = products.findAll().getFirst().getId();
        place(session, "{\"items\":[{\"id\":" + valid
            + ",\"quantity\":1,\"size\":\"M\"},{\"id\":2147483647,\"quantity\":1,\"size\":\"M\"}]}", 400);
        assertEquals(before, orders.count());
    }

    @Test
    void validatesItemsAndDoesNotPersistInvalidRequests() throws Exception {
        MockHttpSession session = registerAndLogin("validation");
        long before = orders.count();
        String[] invalid = {
            "{\"items\":[{\"id\":1,\"quantity\":1.5,\"size\":\"M\"}]}",
            "{}", "{\"items\":[]}", "{\"items\":[null]}",
            "{\"items\":[{\"id\":1,\"quantity\":0,\"size\":\"M\"}]}",
            "{\"items\":[{\"id\":1,\"quantity\":100,\"size\":\"M\"}]}",
            "{\"items\":[{\"id\":1,\"size\":\"M\"}]}",
            "{\"items\":[{\"quantity\":1,\"size\":\"M\"}]}",
            "{\"items\":[{\"id\":1,\"quantity\":1,\"size\":\" \"}]}",
            "{\"items\":[{\"id\":1,\"quantity\":1,\"size\":\"123456789012345678901\"}]}"
        };
        for (String body : invalid) place(session, body, 400);
        var items = new java.util.ArrayList<Object>();
        for (int i = 0; i < 101; i++) items.add(java.util.Map.of("id", 1, "quantity", 1, "size", "M"));
        place(session, json.writeValueAsString(java.util.Map.of("items", items)), 400);
        assertEquals(before, orders.count());
    }

    @Test
    void requiresAuthenticationAndCsrf() throws Exception {
        mvc.perform(get("/api/orders/allOrders")).andExpect(status().isUnauthorized());
        // A valid anonymous CSRF token passes CSRF, but cannot bypass authentication.
        MvcResult csrf = mvc.perform(get("/api/csrf")).andReturn();
        MockHttpSession anonymous = (MockHttpSession) csrf.getRequest().getSession(false);
        String token = json.readTree(csrf.getResponse().getContentAsString()).get("token").asText();
        mvc.perform(post("/api/orders/placeOrder").session(anonymous).header("X-CSRF-TOKEN", token)
            .contentType(MediaType.APPLICATION_JSON).content("{\"items\":[]}"))
            .andExpect(status().isUnauthorized());
        MockHttpSession session = registerAndLogin("csrf");
        mvc.perform(post("/api/orders/placeOrder").session(session)
            .contentType(MediaType.APPLICATION_JSON).content("{\"items\":[]}"))
            .andExpect(status().isForbidden());
    }

    private MockHttpSession registerAndLogin(String prefix) throws Exception {
        String email = prefix + "-" + UUID.randomUUID() + "@example.com";
        MvcResult csrf = mvc.perform(get("/api/csrf")).andExpect(status().isOk()).andReturn();
        MockHttpSession session = (MockHttpSession) csrf.getRequest().getSession(false);
        String token = json.readTree(csrf.getResponse().getContentAsString()).get("token").asText();
        mvc.perform(post("/api/users/register").session(session).header("X-CSRF-TOKEN", token)
            .contentType(MediaType.APPLICATION_JSON).content(json.writeValueAsString(java.util.Map.of(
                "firstName", "Order", "lastName", "Test", "email", email, "password", "TestPassword123!"))))
            .andExpect(status().isCreated());
        mvc.perform(post("/api/users/login").session(session).header("X-CSRF-TOKEN", token)
            .param("email", email).param("password", "TestPassword123!"))
            .andExpect(status().isNoContent());
        return session;
    }

    private MvcResult place(MockHttpSession session, String body, int expectedStatus) throws Exception {
        MvcResult csrf = mvc.perform(get("/api/csrf").session(session)).andExpect(status().isOk()).andReturn();
        String token = json.readTree(csrf.getResponse().getContentAsString()).get("token").asText();
        return mvc.perform(post("/api/orders/placeOrder").session(session)
            .header("X-CSRF-TOKEN", token).contentType(MediaType.APPLICATION_JSON).content(body))
            .andExpect(status().is(expectedStatus)).andReturn();
    }
}
