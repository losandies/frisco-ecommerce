package com.frisco.backend_java.controllers;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import com.frisco.backend_java.dto.OrderResponse;
import com.frisco.backend_java.dto.PlaceOrderRequest;
import com.frisco.backend_java.services.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/placeOrder")
    public ResponseEntity<OrderResponse> placeOrder(Authentication authentication,
            @Valid @RequestBody PlaceOrderRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(orderService.placeOrder(authentication.getName(), request));
    }

    @GetMapping("/allOrders")
    public List<OrderResponse> getAllOrders(Authentication authentication) {
        return orderService.getAllOrders(authentication.getName());
    }
}
