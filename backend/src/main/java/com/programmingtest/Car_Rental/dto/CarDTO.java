package com.programmingtest.Car_Rental.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarDTO {

    private long id;

    private String name;

    private String brand;

    private String type;

    private String color;

    private String transmission;

    private int price;

    private String year;

    private MultipartFile image;

    private byte[] returnedImage;
}
