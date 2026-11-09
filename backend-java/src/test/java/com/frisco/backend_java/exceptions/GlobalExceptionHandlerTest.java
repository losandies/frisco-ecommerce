package com.frisco.backend_java.exceptions;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

public class GlobalExceptionHandlerTest {
    @Test 
    void missingCurrentUserInvalidateSession() {
        MockHttpServletRequest mockRequest = new MockHttpServletRequest();
        MockHttpServletResponse mockResponse = new MockHttpServletResponse();

        MockHttpSession session = (MockHttpSession) mockRequest.getSession();

        SecurityContextHolder.getContext().setAuthentication(UsernamePasswordAuthenticationToken.authenticated("session-test@example.com", null, List.of()));  

        GlobalExceptionHandler handler = new GlobalExceptionHandler();

        ResponseEntity<Map<String, String>> exceptionResponse = handler.handleCurrentUserNotFoundException(new CurrentUserNotFoundException("Please log in again"), mockRequest, mockResponse);

        assertEquals(HttpStatus.UNAUTHORIZED, exceptionResponse.getStatusCode());
        assertTrue(session.isInvalid());
        assertNull(SecurityContextHolder.getContext().getAuthentication());
    }

    @AfterEach 
    void clearContext() {
        SecurityContextHolder.clearContext();
    }
}
