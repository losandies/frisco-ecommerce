package com.frisco.backend_java.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record OrderItemRequest(
    @NotNull Integer id,
    @NotNull  @Min (1) @Max (99) Integer quantity,
    @NotBlank @Size(max = 20) String size
) {
    
}
