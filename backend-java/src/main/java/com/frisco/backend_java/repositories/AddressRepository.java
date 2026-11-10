package com.frisco.backend_java.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.frisco.backend_java.models.Address;
import com.frisco.backend_java.models.User;


public interface AddressRepository extends JpaRepository<Address, UUID> {
    Optional<Address> findByUser(User user);
}
