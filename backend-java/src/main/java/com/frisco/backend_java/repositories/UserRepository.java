package com.frisco.backend_java.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.frisco.backend_java.models.User;

public interface UserRepository extends JpaRepository<User, UUID>{
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
}
