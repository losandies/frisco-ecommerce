package com.frisco.backend_java.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.frisco.backend_java.dto.LoginRequest;
import com.frisco.backend_java.dto.RegisterRequest;
import com.frisco.backend_java.dto.RegisterResponse;
import com.frisco.backend_java.services.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RequestMapping("/api/users")
@RestController
public class UserController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final SecurityContextRepository securityContextRepository;
    private final SessionAuthenticationStrategy sessionAuthenticationStrategy;

    public UserController(UserService userService, AuthenticationManager authenticationManager, SecurityContextRepository securityContextRepository, SessionAuthenticationStrategy sessionAuthenticationStrategy) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.securityContextRepository = securityContextRepository;
        this.sessionAuthenticationStrategy = sessionAuthenticationStrategy;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> registerUser(@Valid @RequestBody RegisterRequest request) {
        RegisterResponse response = userService.register(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpRequest,
        HttpServletResponse httpResponse) {
        Authentication authentication = authenticationManager.authenticate(UsernamePasswordAuthenticationToken.unauthenticated(request.email(), request.password()));

        sessionAuthenticationStrategy.onAuthentication(authentication, httpRequest, httpResponse);

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);

        SecurityContextHolder.setContext(context);
        securityContextRepository.saveContext(context, httpRequest, httpResponse);

        return ResponseEntity.noContent().build();
    }
    
    
}
