package com.frisco.backend_java.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.session.ChangeSessionIdAuthenticationStrategy;
import org.springframework.security.web.authentication.session.CompositeSessionAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.csrf.CsrfAuthenticationStrategy;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

@Configuration 
public class SecurityConfig {
    @Bean 
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, SecurityContextRepository securityContextRepository, CsrfTokenRepository csrfTokenRepository) throws Exception {
        http.authorizeHttpRequests(authorize -> authorize.requestMatchers(HttpMethod.GET, "/api/csrf").permitAll());

        http.authorizeHttpRequests(authorize -> authorize.requestMatchers(HttpMethod.GET, "/api/products").permitAll());

        http.authorizeHttpRequests(authorize -> authorize.requestMatchers(HttpMethod.POST, "/api/users/register").permitAll());

        http.authorizeHttpRequests(authorize -> authorize.requestMatchers(HttpMethod.POST, "/api/users/login").permitAll());

        http.authorizeHttpRequests(authorize -> authorize.anyRequest().authenticated());

        http.securityContext(security -> security.securityContextRepository(securityContextRepository));

        http.csrf(csrf -> csrf.csrfTokenRepository(csrfTokenRepository));

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityContextRepository securityContextRepository() {
        return new HttpSessionSecurityContextRepository();
    }

    @Bean 
    public SessionAuthenticationStrategy changeAuthenticationStrategy(CsrfTokenRepository csrfTokenRepository) {

        ChangeSessionIdAuthenticationStrategy changeSessionIdAuthenticationStrategy = new ChangeSessionIdAuthenticationStrategy();

        CsrfAuthenticationStrategy csrfAuthenticationStrategy = new CsrfAuthenticationStrategy(csrfTokenRepository);


        return new CompositeSessionAuthenticationStrategy(List.of(changeSessionIdAuthenticationStrategy, csrfAuthenticationStrategy));
    }

    @Bean 
    public CsrfTokenRepository csrfTokenRepository() {
        return new HttpSessionCsrfTokenRepository();
    }
}
