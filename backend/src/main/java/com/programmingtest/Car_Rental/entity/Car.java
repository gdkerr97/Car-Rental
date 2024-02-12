package com.programmingtest.Car_Rental.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String name;

    @NotNull
    private String brand;

    @NotNull
    private String type;

    @NotNull
    private String color;

    @NotNull
    private String transmission;

    @NotNull
    @Min(value = 1, message = "Price must be a positive integer!")
    private int price;

    @NotNull
    @Size(min = 4, max = 4, message = "Year must be 4 characters long!")
    private String year;

    @NotNull
    @Column(columnDefinition = "longblob")
    private byte[] image;
}
