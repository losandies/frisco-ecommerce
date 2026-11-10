package com.frisco.backend_java.services;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.frisco.backend_java.dto.AddressResponse;
import com.frisco.backend_java.dto.UpdateAddressRequest;
import com.frisco.backend_java.exceptions.CurrentUserNotFoundException;
import com.frisco.backend_java.models.Address;
import com.frisco.backend_java.models.User;
import com.frisco.backend_java.repositories.AddressRepository;
import com.frisco.backend_java.repositories.UserRepository;

@Service 
public class AddressService {
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    @Transactional 
    public AddressResponse updateAddress(String userEmail, UpdateAddressRequest addressInfo) {
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> 
                new CurrentUserNotFoundException("Please log in again"));

        String street = addressInfo.street().trim();
        String city = addressInfo.city().trim();
        String state = addressInfo.state().trim();
        String zipCode = addressInfo.zipCode().trim();

        Optional<Address> existingAddress = addressRepository.findByUser(user);
        
        Address address;

        if(existingAddress.isPresent()) {
            address = existingAddress.get();
            address.updateDetails(street, city, state, zipCode);
        } else {
            address = new Address(user, street, city, state, zipCode);
        }

        addressRepository.save(address);

        return new AddressResponse(user.getId(), street, city, state, zipCode);
        
    }
}
