package com.programmingtest.Car_Rental.dto;

import com.programmingtest.Car_Rental.enums.BookStatus;
import lombok.Getter;
import lombok.Setter;


import java.util.Date;

@Getter
@Setter
public class BookDTO {

    private Long id;

    private Date fromDate;

    private Date toDate;

    private Long days;

    private Long price;

    private BookStatus bookStatus;

    private Long userId;

    private Long carId;
}