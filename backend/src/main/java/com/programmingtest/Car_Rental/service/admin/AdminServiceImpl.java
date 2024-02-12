package com.programmingtest.Car_Rental.service.admin;

import com.programmingtest.Car_Rental.dto.BookDTO;
import com.programmingtest.Car_Rental.dto.CarDTO;
import com.programmingtest.Car_Rental.dto.UserDTO;
import com.programmingtest.Car_Rental.entity.Book;
import com.programmingtest.Car_Rental.entity.Car;
import com.programmingtest.Car_Rental.enums.BookStatus;
import com.programmingtest.Car_Rental.mapper.BookMapper;
import com.programmingtest.Car_Rental.mapper.CarMapper;
import com.programmingtest.Car_Rental.mapper.UserMapper;
import com.programmingtest.Car_Rental.repository.BookRepository;
import com.programmingtest.Car_Rental.repository.CarRepository;
import com.programmingtest.Car_Rental.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final BookRepository bookRepository;
    private final BookMapper bookMapper;
    private final CarRepository carRepository;
    private final CarMapper carMapper;
    private final UserRepository userRepository;
    private final UserMapper userMapper;


    @Override
    public boolean publishCar(CarDTO carDTO) {
        try {
            Car car = carMapper.carDTOToEntity(carDTO);
            carRepository.save(car);
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    @Override
    public List<CarDTO> getAll() {
        return carMapper.carToDTOs(carRepository.findAll());
    }

    @Override
    public void deleteCar(Long id) {
        Car car = carRepository.findById(id).orElseThrow(() -> new RuntimeException("Car not found!"));
        carRepository.delete(car);
    }

    @Override
    public CarDTO getCarById(Long id) {
        return carMapper.carToDTO(carRepository.findById(id).orElseThrow(() -> new RuntimeException("Car not found!")));
    }

    @Override
    public boolean updateCar(CarDTO carDTO) {

        try {
            if (carRepository.findById(carDTO.getId()).isPresent()) {
                Car car = carMapper.carDTOToEntity(carDTO);
                carRepository.save(car);
                return true;
            } else {
                throw new RuntimeException("Car not found!");
            }
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<BookDTO> getAllBookings() {
        return bookMapper.bookToDTOs(bookRepository.findAll().stream().toList());
    }

    @Override
    public UserDTO getUserById(Long id) {
        return userMapper.userToDTO(userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found!")));
    }

    @Override
    public boolean changeBookStatus(Long id, String status){
        Book booking = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found!"));
        if(booking != null) {
            booking.setBookStatus(status.equals("APPROVE") ? BookStatus.APPROVED : BookStatus.REJECTED);
            bookRepository.save(booking);
            return true;
        }else{
            return false;
        }
    }
}