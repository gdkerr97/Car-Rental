package com.programmingtest.Car_Rental.service.customer;

import com.programmingtest.Car_Rental.dto.BookDTO;
import com.programmingtest.Car_Rental.dto.CarDTO;
import com.programmingtest.Car_Rental.entity.Car;
import com.programmingtest.Car_Rental.entity.User;
import com.programmingtest.Car_Rental.enums.BookStatus;
import com.programmingtest.Car_Rental.mapper.BookMapper;
import com.programmingtest.Car_Rental.mapper.CarMapper;
import com.programmingtest.Car_Rental.repository.BookRepository;
import com.programmingtest.Car_Rental.repository.CarRepository;
import com.programmingtest.Car_Rental.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService{

    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final CarMapper carMapper;
    private final BookMapper bookMapper;


    @Override
    public List<CarDTO> getAll() {
        return carMapper.carToDTOs(carRepository.findAll());
    }

    @Override
    public CarDTO getCarById(Long id) {
        return carMapper.carToDTO(carRepository.findById(id).orElseThrow(() -> new RuntimeException("Car not found!")));
    }

    @Override
    public boolean bookACar(BookDTO bookDTO) {
        if(carRepository.findById(bookDTO.getCarId()).isPresent() && userRepository.findById(bookDTO.getUserId()).isPresent()){
            long diffMillis = bookDTO.getToDate().getTime() - bookDTO.getFromDate().getTime();
            long days = TimeUnit.MILLISECONDS.toDays(diffMillis);
            long price = carRepository.findById(bookDTO.getCarId()).stream().map(Car::getPrice).findFirst().get() * days;
            bookDTO.setDays(days);
            bookDTO.setBookStatus(BookStatus.PENDING);
            bookDTO.setPrice(price);

            bookRepository.save(bookMapper.bookDTOToEntity(bookDTO));
            return true;
        }else{
            return false;
        }
    }

    @Override
    public List<BookDTO> getBookingByUserId(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found!"));
        if(user != null) {
            return bookMapper.bookToDTOs(bookRepository.findAllByUser(user).orElseThrow(() -> new RuntimeException("Books not found!")));
        }
        else{
            return null;
        }
    }
}
