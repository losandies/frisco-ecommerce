package com.frisco.backend_java.services;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.frisco.backend_java.models.Product;
import com.frisco.backend_java.repositories.ProductRepository;

@Service 
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll(Sort.by( "id").ascending());
    }
}
