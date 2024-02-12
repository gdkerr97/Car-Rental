package com.programmingtest.Car_Rental.controller;

import com.programmingtest.Car_Rental.dto.AuthenticationRequest;
import com.programmingtest.Car_Rental.dto.AuthenticationResponse;
import com.programmingtest.Car_Rental.dto.SignupRequest;
import com.programmingtest.Car_Rental.dto.UserDTO;
import com.programmingtest.Car_Rental.entity.User;
import com.programmingtest.Car_Rental.repository.UserRepository;
import com.programmingtest.Car_Rental.service.auth.AuthServiceImpl;

import com.programmingtest.Car_Rental.service.JWTService;
import com.programmingtest.Car_Rental.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthServiceImpl authService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final UserRepository userRepository;
    private final JWTService jwtService;

    @PostMapping("/signup")
    public ResponseEntity<?> createCustomer(@RequestBody SignupRequest signupRequest){
        UserDTO userDTO = authService.createCustomer(signupRequest);
        if(userDTO == null){
            return new ResponseEntity<>("Customer already exist!", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws BadCredentialsException, DisabledException, UsernameNotFoundException {

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        }catch(BadCredentialsException e){
            throw new BadCredentialsException("Incorrect email or password!");
        }

            final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());
            Optional<User> user = userRepository.findByEmail(userDetails.getUsername());
            final String jwt = jwtService.generateToken(userDetails);
            AuthenticationResponse authenticationResponse = new AuthenticationResponse();
            if (user.isPresent()) {

                authenticationResponse.setJwt(jwt);
                authenticationResponse.setUserId(user.get().getId());
                authenticationResponse.setUserRole(user.get().getRole());
            }


            return authenticationResponse;
    }
}
