package com.frisco.backend_java;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.ConfigDataApplicationContextInitializer;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;
import org.springframework.boot.web.server.autoconfigure.ServerProperties;
import org.springframework.context.annotation.Configuration;

class ProductionConfigurationTest {
    private final ApplicationContextRunner runner = new ApplicationContextRunner()
        .withInitializer(new ConfigDataApplicationContextInitializer())
        .withUserConfiguration(PropertiesConfiguration.class);

    @Test
    void productionUsesSecureCookiesAndValidatesExistingSchema() {
        runner.withPropertyValues(
            "spring.profiles.active=prod",
            "DB_URL=jdbc:postgresql://db:5432/frisco?sslmode=verify-full",
            "DB_USERNAME=frisco_app",
            "DB_PASSWORD=test-only"
        ).run(context -> {
            assertThat(context).hasNotFailed();
            var cookie = context.getBean(ServerProperties.class).getServlet().getSession().getCookie();
            assertThat(cookie.getSecure()).isTrue();
            assertThat(cookie.getHttpOnly()).isTrue();
            assertThat(cookie.getSameSite().toString()).isEqualToIgnoringCase("lax");
            assertThat(context.getEnvironment().getProperty("spring.jpa.hibernate.ddl-auto"))
                .isEqualTo("validate");
            assertThat(context.getEnvironment().getProperty("spring.jpa.show-sql"))
                .isEqualTo("false");
            assertThat(context.getEnvironment().getProperty("spring.datasource.username"))
                .isEqualTo("frisco_app");
        });
    }

    @Test
    void localDevelopmentRetainsItsExistingSchemaSetting() {
        runner.run(context -> assertThat(
            context.getEnvironment().getProperty("spring.jpa.hibernate.ddl-auto")
        ).isEqualTo("update"));
    }

    @Configuration(proxyBeanMethods = false)
    @EnableConfigurationProperties(ServerProperties.class)
    static class PropertiesConfiguration { }
}
