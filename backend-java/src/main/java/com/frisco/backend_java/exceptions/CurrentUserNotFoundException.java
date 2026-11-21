package com.frisco.backend_java.exceptions;

public class CurrentUserNotFoundException extends RuntimeException {
    public CurrentUserNotFoundException(String message) {
        super(message);
    }
}
