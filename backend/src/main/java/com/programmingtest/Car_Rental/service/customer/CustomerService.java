package com.programmingtest.Car_Rental.service.customer;

import com.programmingtest.Car_Rental.dto.BookDTO;
import com.programmingtest.Car_Rental.dto.CarDTO;

import java.util.List;

public interface CustomerService {

    List<CarDTO> getAll();

    CarDTO getCarById(Long id);

    boolean bookACar(BookDTO bookDTO);

    List<BookDTO> getBookingByUserId(Long id);
}
