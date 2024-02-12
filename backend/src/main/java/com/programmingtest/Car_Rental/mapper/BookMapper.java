package com.programmingtest.Car_Rental.mapper;

import com.programmingtest.Car_Rental.dto.BookDTO;
import com.programmingtest.Car_Rental.entity.Book;
import com.programmingtest.Car_Rental.entity.Car;
import com.programmingtest.Car_Rental.entity.User;
import com.programmingtest.Car_Rental.repository.CarRepository;
import com.programmingtest.Car_Rental.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class BookMapper{

    @Autowired
    protected UserRepository userRepository;
    @Autowired
    protected CarRepository carRepository;

    @Mapping(source = "userId", target = "user", qualifiedByName = "toUser")
    @Mapping(source = "carId", target = "car", qualifiedByName = "toCar")
    public abstract Book bookDTOToEntity(BookDTO bookDTO);

    @Mapping(source = "user", target = "userId", qualifiedByName = "toUserId")
    @Mapping(source = "car", target = "carId", qualifiedByName = "toCarId")
    public abstract BookDTO bookToDTO(Book book);

    @Mapping(source = "userId", target = "user", qualifiedByName = "toUser")
    @Mapping(source = "carId", target = "car", qualifiedByName = "toCar")
    public abstract List<Book> bookDTOsToEntities(List<BookDTO> bookDTO);

    @Mapping(source = "user", target = "userId", qualifiedByName = "toUserId")
    @Mapping(source = "car", target = "carId", qualifiedByName = "toCarId")
    public abstract List<BookDTO> bookToDTOs(List<Book> book);


    @Named("toUser")
    User toUser(Long userId){
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found!"));
    }

    @Named("toUserId")
    Long toUserId(User user){
        return user.getId();
    }

    @Named("toCar")
    Car toCar(Long carId){
        return carRepository.findById(carId).orElseThrow(() -> new RuntimeException("Car not found!"));
    }

    @Named("toCarId")
    Long toCarId(Car car){
        return car.getId();
    }

}
