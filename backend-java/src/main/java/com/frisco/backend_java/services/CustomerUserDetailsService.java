package com.frisco.backend_java.services;

import java.util.Locale;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.frisco.backend_java.models.User;
import com.frisco.backend_java.repositories.UserRepository;

@Service 
public class CustomerUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomerUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String normalizedUsername = username.trim().toLowerCase(Locale.ROOT);

        Optional<User> foundUser = userRepository.findByEmail(normalizedUsername);

        if(!foundUser.isPresent()) {
            throw new UsernameNotFoundException(normalizedUsername);
        }

        return org.springframework.security.core.userdetails.User
            .withUsername(foundUser.get().getEmail())
            .password(foundUser.get().getHashedPassword())
            .roles("USER")
            .build();          
    }
}   
