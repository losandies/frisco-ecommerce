package com.frisco.backend_java.dto;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
    @NotBlank @Email String email, 
    @NotBlank String password,
    HttpServletRequest httpRequest,
    HttpServletResponse httpResponse) {
}