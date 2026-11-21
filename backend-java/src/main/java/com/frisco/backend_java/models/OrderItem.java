package com.frisco.backend_java.models;

import java.math.BigDecimal;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(nullable = false)
    private Integer productId;

    private String name;

    private String brand;

    private String category;

    private String subcategory;

    private String imgPath;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;

    @Column(nullable = false)
    private String size;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Integer linePosition;

    protected OrderItem() {}

    public OrderItem(Order order, Product product, String size, Integer quantity, int linePosition) {
        this.order = order;
        this.productId = product.getId();
        this.name = product.getName();
        this.brand = product.getBrand();
        this.category = product.getCategory();
        this.subcategory = product.getSubcategory();
        this.imgPath = product.getImgPath();
        this.unitPrice = product.getPrice();
        this.size = size;
        this.quantity = quantity;
        this.linePosition = linePosition;
    }

    public UUID getId() { return id; }
    public Integer getProductId() { return productId; }
    public String getName() { return name; }
    public String getBrand() { return brand; }
    public String getCategory() { return category; }
    public String getSubcategory() { return subcategory; }
    public String getImgPath() { return imgPath; }
    public BigDecimal getUnitPrice() { return unitPrice; }
    public String getSize() { return size; }
    public Integer getQuantity() { return quantity; }
}
