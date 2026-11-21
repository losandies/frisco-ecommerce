package com.frisco.backend_java.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.frisco.backend_java.models.Product;

public interface  ProductRepository extends JpaRepository<Product, Integer> {
    
}
