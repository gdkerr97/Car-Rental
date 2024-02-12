package com.programmingtest.Car_Rental.dto;

import com.programmingtest.Car_Rental.enums.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationResponse {

    private String jwt;
    private long userId;
    private Role userRole;
}
