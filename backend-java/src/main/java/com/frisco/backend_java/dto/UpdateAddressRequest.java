package com.frisco.backend_java.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateAddressRequest(
    @NotBlank String street, 
    @NotBlank String city, 
    @NotBlank String state, 
    @NotBlank String zipCode) {
    
}
