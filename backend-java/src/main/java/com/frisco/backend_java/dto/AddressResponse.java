package com.frisco.backend_java.dto;

import java.util.UUID;

public record AddressResponse(
    UUID userId, 
    String street,
    String city,
    String state,
    String zipCode) {
    
}
