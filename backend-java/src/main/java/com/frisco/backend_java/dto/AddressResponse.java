package com.frisco.backend_java.dto;

public record AddressResponse(
    String street,
    String city,
    String state,
    String zipCode) {
    
}
