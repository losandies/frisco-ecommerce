package com.frisco.backend_java.dto;

import java.math.BigDecimal;
import com.frisco.backend_java.models.OrderItem;

// id and price retain the original API's product snapshot field names.
public record OrderItemResponse(Integer id, String name, String brand, String category,
        String subcategory, BigDecimal price, String imgPath, Integer quantity, String size) {
    public static OrderItemResponse from(OrderItem item) {
        return new OrderItemResponse(item.getProductId(), item.getName(), item.getBrand(),
            item.getCategory(), item.getSubcategory(), item.getUnitPrice(), item.getImgPath(),
            item.getQuantity(), item.getSize());
    }
}
