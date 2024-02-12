package com.programmingtest.Car_Rental.mapper;

import com.programmingtest.Car_Rental.dto.UserDTO;
import com.programmingtest.Car_Rental.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;


@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO userToDTO(User user);
    User userDTOToUser(UserDTO userDTO);

    List<UserDTO> userToDTO(List<User> user);
    List<User> userDTOToUser(List<UserDTO> userDTO);
}
