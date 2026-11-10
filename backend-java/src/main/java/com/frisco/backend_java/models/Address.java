package com.frisco.backend_java.models;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity 
@Table (name = "addresses")
public class Address {
    @Id 
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID addressId;

    @OneToOne (optional = false)
    @JoinColumn (name = "user_id", nullable = false, unique = true)
    private User user;

    private String street;

    private String city;

    private String state;

    private String zipCode;

    protected Address() {}

    public Address(User user, String street, String city, String state, String zipCode) {
        this.user = user;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }

    public void updateDetails(String street, String city, String state, String zipCode) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }

    public UUID getAddressId() {
        return addressId;
    }

    public User getUser() {
        return user;
    }

    public String getStreet() {
        return street;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public String getZipCode() {
        return zipCode;
    }

    
}
