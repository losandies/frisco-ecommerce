package com.frisco.backend_java.dto;

import java.time.Instant;
import java.util.UUID;
import java.util.List;

public record CurrentUserResponse(UUID id, 
String firstName, 
String lastName, 
String email, 
AddressResponse address,
List<OrderResponse> orders,
Instant createdAt) {
    
}
