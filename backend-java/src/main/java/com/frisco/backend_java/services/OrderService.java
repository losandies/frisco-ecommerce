package com.frisco.backend_java.services;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.frisco.backend_java.dto.OrderItemRequest;
import com.frisco.backend_java.dto.OrderResponse;
import com.frisco.backend_java.dto.PlaceOrderRequest;
import com.frisco.backend_java.exceptions.CurrentUserNotFoundException;
import com.frisco.backend_java.exceptions.ProductUnavailableException;
import com.frisco.backend_java.models.Order;
import com.frisco.backend_java.models.Product;
import com.frisco.backend_java.models.User;
import com.frisco.backend_java.repositories.OrderRepository;
import com.frisco.backend_java.repositories.ProductRepository;
import com.frisco.backend_java.repositories.UserRepository;

@Service
public class OrderService {
    private static final BigDecimal SHIPPING = new BigDecimal("5.00");
    private static final BigDecimal DEMO_TAX_RATE = new BigDecimal("0.06");

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public OrderService(UserRepository userRepository, ProductRepository productRepository,
            OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }

    @Transactional
    public OrderResponse placeOrder(String email, PlaceOrderRequest request) {
        User user = findUser(email);
        List<Integer> productIds = request.items().stream().map(OrderItemRequest::id).distinct().toList();
        Map<Integer, Product> catalog = productRepository.findAllById(productIds).stream()
            .collect(Collectors.toMap(Product::getId, Function.identity()));

        BigDecimal subtotal = new BigDecimal("0.00");
        for (OrderItemRequest item : request.items()) {
            Product product = catalog.get(item.id());
            if (product == null) {
                throw new ProductUnavailableException();
            }
            subtotal = subtotal.add(product.getPrice().multiply(BigDecimal.valueOf(item.quantity())));
        }
        BigDecimal tax = subtotal.multiply(DEMO_TAX_RATE).setScale(2, RoundingMode.HALF_UP);
        BigDecimal total = subtotal.add(SHIPPING).add(tax).setScale(2, RoundingMode.HALF_UP);

        Order order = new Order(user, total);
        for (OrderItemRequest item : request.items()) {
            order.addItem(catalog.get(item.id()), item.size(), item.quantity());
        }
        // Flush before mapping so generated IDs and timestamps are available.
        return OrderResponse.from(orderRepository.saveAndFlush(order));
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders(String email) {
        User user = findUser(email);
        return orderRepository.findAllByUser_IdOrderByCreatedAtDesc(user.getId()).stream()
            .map(OrderResponse::from).toList();
    }

    private User findUser(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new CurrentUserNotFoundException("Please log in again"));
    }
}
