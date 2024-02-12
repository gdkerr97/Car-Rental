package com.programmingtest.Car_Rental.service.admin;

import com.programmingtest.Car_Rental.dto.BookDTO;
import com.programmingtest.Car_Rental.dto.CarDTO;
import com.programmingtest.Car_Rental.dto.UserDTO;

import java.util.List;

public interface AdminService {

    boolean publishCar(CarDTO carDTO);
    List<CarDTO> getAll();

    void deleteCar(Long id);

    CarDTO getCarById(Long id);

    boolean updateCar(CarDTO carDTO);

    List<BookDTO> getAllBookings();

    UserDTO getUserById(Long id);

    boolean changeBookStatus(Long id, String status);

}
