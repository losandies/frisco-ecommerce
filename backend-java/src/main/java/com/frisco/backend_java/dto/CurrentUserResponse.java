package com.frisco.backend_java.dto;

import java.time.Instant;
import java.util.UUID;

public record CurrentUserResponse(UUID id, 
String firstName, 
String lastName, 
String email, 
Instant createdAt) {
    
}
