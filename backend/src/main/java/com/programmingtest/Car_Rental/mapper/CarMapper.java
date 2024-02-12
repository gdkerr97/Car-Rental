package com.programmingtest.Car_Rental.mapper;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.programmingtest.Car_Rental.dto.CarDTO;
import com.programmingtest.Car_Rental.entity.Car;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.io.IOException;
import java.util.List;

@Mapper(componentModel = "spring")
public interface CarMapper {

    @Mapping(target = "image", expression = "java(carDTO.getImage().getBytes())")
    Car carDTOToEntity(CarDTO carDTO) throws IOException;

    @Mapping(target = "image", ignore = true)
    @Mapping(source = "image", target = "returnedImage")
    CarDTO carToDTO(Car car);

    List<Car> carDTOsTOEntity(List<CarDTO> carDTO);

    List<CarDTO> carToDTOs(List<Car> car);
}
