package com.frisco.backend_java.exceptions;

public class InvalidPasswordLengthException extends RuntimeException {
    public InvalidPasswordLengthException(String message) {
        super(message);
    }
}
