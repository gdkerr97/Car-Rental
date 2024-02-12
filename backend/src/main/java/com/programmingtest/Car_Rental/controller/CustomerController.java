package com.programmingtest.Car_Rental.controller;

import com.programmingtest.Car_Rental.dto.BookDTO;
import com.programmingtest.Car_Rental.dto.CarDTO;
import com.programmingtest.Car_Rental.entity.Book;
import com.programmingtest.Car_Rental.service.customer.CustomerServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:4200")
public class CustomerController {

    private final CustomerServiceImpl customerService;

    @GetMapping("/car")
    public ResponseEntity<List<CarDTO>> getAll(){
        List<CarDTO> result = customerService.getAll();
        if(!result.isEmpty()){
            return ResponseEntity.ok(result);
        }else{
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/car/book")
    public ResponseEntity<?> bookACar(@RequestBody BookDTO bookDTO){
        boolean result = customerService.bookACar(bookDTO);
        if(result){
            return new ResponseEntity<>(HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/car/{id}")
    public ResponseEntity<CarDTO> getCarById(@PathVariable Long id){
        CarDTO result = customerService.getCarById(id);
        if(result != null) {
            return ResponseEntity.ok(result);
        }else{
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/book/{id}")
    public ResponseEntity<List<BookDTO>> getBooksByUserId(@PathVariable Long id){
        List<BookDTO> result = customerService.getBookingByUserId(id);
        if(!result.isEmpty()){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else{
            return ResponseEntity.badRequest().build();
        }
    }
}
