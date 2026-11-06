package com.frisco.backend_java.services;

import java.nio.charset.StandardCharsets;
import java.util.Locale;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.frisco.backend_java.dto.RegisterRequest;
import com.frisco.backend_java.dto.RegisterResponse;
import com.frisco.backend_java.exceptions.EmailAlreadyExistsException;
import com.frisco.backend_java.exceptions.InvalidPasswordLengthException;
import com.frisco.backend_java.models.User;
import com.frisco.backend_java.repositories.UserRepository;


@Service 
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public RegisterResponse register(RegisterRequest request) {

            String firstName = request.firstName().trim();
            String lastName = request.lastName().trim() ;
            String email = request.email().trim().toLowerCase(Locale.ROOT);

            if (userRepository.existsByEmail(email)) {
                throw new EmailAlreadyExistsException("User already exists");
            }

            if(request.password().getBytes(StandardCharsets.UTF_8).length > 72) {
                throw new InvalidPasswordLengthException("Password must be at most 72 UTF-8 bytes");
            }
            String passwordHash = passwordEncoder.encode(request.password());

            try {
                User user = userRepository.saveAndFlush(new User(firstName, lastName, email, passwordHash));
                return new RegisterResponse(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getCreatedAt());
                
            } catch (DataIntegrityViolationException e) {
                if(e.getCause() instanceof ConstraintViolationException violation) {
                    if(violation.getConstraintName().equals("uk6dotkott2kjsp8vw4d0m25fb7")) {
                        throw new EmailAlreadyExistsException("User already exists");
                    }
                }
                throw e;
            }



    }
}
