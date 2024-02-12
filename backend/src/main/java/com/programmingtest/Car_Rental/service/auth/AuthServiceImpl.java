package com.programmingtest.Car_Rental.service.auth;

import com.programmingtest.Car_Rental.dto.SignupRequest;
import com.programmingtest.Car_Rental.dto.UserDTO;
import com.programmingtest.Car_Rental.entity.User;
import com.programmingtest.Car_Rental.enums.Role;
import com.programmingtest.Car_Rental.mapper.UserMapper;
import com.programmingtest.Car_Rental.repository.UserRepository;

import com.programmingtest.Car_Rental.service.auth.AuthService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    // esegue automaticamente il metodo dopo la costruzione del costruttore
    @PostConstruct
    public void createAdmin(){
        if(userRepository.findByRole(Role.ADMIN).isEmpty()){

            User user = new User();
            user.setName("admin");
            user.setPassword(new BCryptPasswordEncoder().encode("admin"));
            user.setEmail("admin@gmail.com");
            user.setRole(Role.ADMIN);

            userRepository.save(user);
            System.err.println("Admin user created successfully!");
        }
    }



    public UserDTO createCustomer(SignupRequest signupRequest){
        if(userRepository.findByEmail(signupRequest.getEmail()).isPresent()){
            return null;
        }
            UserDTO user = UserDTO.builder()
                    .name(signupRequest.getName())
                    .email(signupRequest.getEmail())
                    .password(new BCryptPasswordEncoder().encode(signupRequest.getPassword()))
                    .role(Role.CUSTOMER).build();

            User createdUser = userRepository.save(userMapper.userDTOToUser(user));
            user.setId(createdUser.getId());
            return user;
    }
}
