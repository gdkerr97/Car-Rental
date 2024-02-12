package com.programmingtest.Car_Rental.dto;

import com.programmingtest.Car_Rental.enums.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserDTO {
    private long id;

    private String name;

    private String email;

    private String password;

    private Role role;
}
