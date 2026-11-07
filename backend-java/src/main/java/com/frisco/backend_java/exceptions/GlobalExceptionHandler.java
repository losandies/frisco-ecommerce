package com.frisco.backend_java.exceptions;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice 
public class GlobalExceptionHandler {
    @ExceptionHandler(EmailAlreadyExistsException.class) 
    public ResponseEntity<Map<String, String>> handleEmailAlreadyExists(EmailAlreadyExistsException exception) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", exception.getMessage()));
    }

    @ExceptionHandler(InvalidPasswordLengthException.class)
    public ResponseEntity<Map<String, String>> handleInvalidPasswordLength(InvalidPasswordLengthException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", exception.getMessage()));
    }

    @ExceptionHandler (MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Map<String, String>>> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        List<FieldError> errors = exception.getBindingResult().getFieldErrors();
        HashMap<String, String> fieldErrors = new HashMap<>();

        for(FieldError error : errors) fieldErrors.putIfAbsent(error.getField(), error.getDefaultMessage());
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("errors", fieldErrors));
    }

    @ExceptionHandler (BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleBadCredentialsException(BadCredentialsException exception) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid Credentials"));
    }
}
