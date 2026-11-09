package com.frisco.backend_java.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.http.HttpServletResponse;

@Configuration 
public class SecurityConfig {
    @Bean 
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authorize -> authorize.requestMatchers(HttpMethod.GET, "/api/csrf").permitAll());

        http.authorizeHttpRequests(authorize -> authorize.requestMatchers(HttpMethod.GET, "/api/products").permitAll());

        http.authorizeHttpRequests(authorize -> authorize.requestMatchers(HttpMethod.POST, "/api/users/register").permitAll());

        http.authorizeHttpRequests(authorize -> authorize.requestMatchers(HttpMethod.POST, "/api/users/login").permitAll());

        http.authorizeHttpRequests(authorize -> authorize.anyRequest().authenticated());

        http.formLogin(formLogin -> 
            formLogin
                .loginProcessingUrl("/api/users/login")
                .usernameParameter("email")
                .passwordParameter("password")
                .successHandler((request, response, authentication) -> {
                    response.setStatus(HttpServletResponse.SC_NO_CONTENT);
                })
                .failureHandler((request, response, exception) -> {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.setContentType("application/json");
                    response.getWriter().write("{\"error\": \"Invalid Credentials\"}");
                    
                }));

                http.logout(logout -> 
                    logout
                        .logoutUrl("/api/users/logout")
                        .logoutSuccessHandler((request, response, authentication) -> {
                            response.setStatus(HttpServletResponse.SC_NO_CONTENT);
                        }));

                http.exceptionHandling(exceptions -> 
                    exceptions.authenticationEntryPoint((request, response, exception) -> {
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    })
                );

        return http.build();
    }
}
