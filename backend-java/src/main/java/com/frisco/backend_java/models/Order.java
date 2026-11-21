package com.frisco.backend_java.models;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, precision = 16, scale = 2)
    private BigDecimal total;

    @CreationTimestamp
    private Instant createdAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("linePosition ASC")
    private List<OrderItem> items = new ArrayList<>();

    protected Order() {}

    public Order(User user, BigDecimal total) {
        this.user = user;
        this.total = total;
    }

    public void addItem(Product product, String size, Integer quantity) {
        items.add(new OrderItem(this, product, size, quantity, items.size()));
    }

    public UUID getId() { return id; }
    public User getUser() { return user; }
    public BigDecimal getTotal() { return total; }
    public Instant getCreatedAt() { return createdAt; }
    public List<OrderItem> getItems() { return Collections.unmodifiableList(items); }
}
