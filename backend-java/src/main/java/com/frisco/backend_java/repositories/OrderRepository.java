package com.frisco.backend_java.repositories;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import com.frisco.backend_java.models.Order;

public interface OrderRepository extends JpaRepository<Order, UUID> {
    @EntityGraph(attributePaths = "items")
    List<Order> findAllByUser_IdOrderByCreatedAtDesc(UUID userId);
}
