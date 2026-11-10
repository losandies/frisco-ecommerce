package com.frisco.backend_java.exceptions;

public class ProductUnavailableException extends RuntimeException {
    public ProductUnavailableException() {
        super("A product is no longer available");
    }
}
