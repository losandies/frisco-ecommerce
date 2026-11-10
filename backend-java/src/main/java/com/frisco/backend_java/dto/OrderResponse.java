package com.frisco.backend_java.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import com.frisco.backend_java.models.Order;

public record OrderResponse(UUID id, UUID userId, List<OrderItemResponse> items,
        BigDecimal total, Instant createdAt) {
    public static OrderResponse from(Order order) {
        return new OrderResponse(order.getId(), order.getUser().getId(),
            order.getItems().stream().map(OrderItemResponse::from).toList(),
            order.getTotal(), order.getCreatedAt());
    }
}
