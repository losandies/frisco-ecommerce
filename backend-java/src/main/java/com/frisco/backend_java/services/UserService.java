package com.frisco.backend_java.services;

import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.Optional;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.frisco.backend_java.dto.AddressResponse;
import com.frisco.backend_java.dto.CurrentUserResponse;
import com.frisco.backend_java.dto.OrderResponse;
import com.frisco.backend_java.dto.RegisterRequest;
import com.frisco.backend_java.dto.RegisterResponse;
import com.frisco.backend_java.exceptions.CurrentUserNotFoundException;
import com.frisco.backend_java.exceptions.EmailAlreadyExistsException;
import com.frisco.backend_java.exceptions.InvalidPasswordLengthException;
import com.frisco.backend_java.models.Address;
import com.frisco.backend_java.models.User;
import com.frisco.backend_java.repositories.AddressRepository;
import com.frisco.backend_java.repositories.UserRepository;
import com.frisco.backend_java.repositories.OrderRepository;


@Service 
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final OrderRepository orderRepository;

    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository, AddressRepository addressRepository, OrderRepository orderRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.orderRepository = orderRepository;
    }

    public RegisterResponse register(RegisterRequest request) {

            String firstName = request.firstName().trim();
            String lastName = request.lastName().trim() ;
            String email = request.email().trim().toLowerCase(Locale.ROOT);

            if (userRepository.existsByEmail(email)) {
                throw new EmailAlreadyExistsException("User already exists");
            }

            if(request.password().getBytes(StandardCharsets.UTF_8).length > 72) {
                throw new InvalidPasswordLengthException("Password is too long. Please choose a shorter password.");
            }
            String passwordHash = passwordEncoder.encode(request.password());

            try {
                User user = userRepository.saveAndFlush(new User(firstName, lastName, email, passwordHash));
                return new RegisterResponse(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getCreatedAt());
                
            } catch (DataIntegrityViolationException e) {
                if(e.getCause() instanceof ConstraintViolationException violation && "uk6dotkott2kjsp8vw4d0m25fb7".equals(violation.getConstraintName())) {
                        throw new EmailAlreadyExistsException("User already exists");
                    }
                
                throw e;
            }
    }

    @Transactional(readOnly = true)
    public CurrentUserResponse getCurrentUser(String email) {

        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> 
                new CurrentUserNotFoundException("Please log in again"));
                

        Optional<Address> userAddress = addressRepository.findByUser(user);

        
        return new CurrentUserResponse(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            userAddress.isPresent()
                ? new AddressResponse(
                    userAddress.get().getStreet(),
                    userAddress.get().getCity(),
                    userAddress.get().getState(),
                    userAddress.get().getZipCode()
                )
                : null,
            orderRepository.findAllByUser_IdOrderByCreatedAtDesc(user.getId()).stream()
                .map(OrderResponse::from).toList(),
            user.getCreatedAt()
);
        

    }
}
