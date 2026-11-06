package com.frisco.backend_java.models;

import java.math.BigDecimal;
import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table(name = "products")
public class Product {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String brand;
    
    private String category;

    private String subcategory;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    private String imgPath;

    @CreationTimestamp 
    private Instant createdAt;

    protected Product() {}

    public Product( String name, String brand, String category, String subcategory, BigDecimal price,
            String imgPath) {
        
        this.name = name;
        this.brand = brand;
        this.category = category;
        this.subcategory = subcategory;
        this.price = price;
        this.imgPath = imgPath;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getBrand() {
        return brand;
    }

    public String getCategory() {
        return category;
    }

    public String getSubcategory() {
        return subcategory;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public String getImgPath() {
        return imgPath;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    

    

}
