package com.frisco.backend_java.seed;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.frisco.backend_java.models.Product;
import com.frisco.backend_java.repositories.ProductRepository;

import tools.jackson.databind.ObjectMapper;

@Component 
public class ProductSeeder implements CommandLineRunner {
    private final ProductRepository productRepository;
    private final ObjectMapper objectMapper;

    public ProductSeeder(ProductRepository productRepository, ObjectMapper objectMapper) {
        this.productRepository = productRepository;
        this.objectMapper = objectMapper;
    }

    @Override 
    public void run(String...args) throws Exception {
        ClassPathResource resource = new ClassPathResource("products.json");

        if(productRepository.count() != 0) {
            return;
        }
        
        Product[] products = objectMapper.readValue(resource.getInputStream(), Product[].class);
        productRepository.saveAll(Arrays.asList(products));

        System.out.println(productRepository.count() + " products were saved to the database.");

        
    }
    
}
