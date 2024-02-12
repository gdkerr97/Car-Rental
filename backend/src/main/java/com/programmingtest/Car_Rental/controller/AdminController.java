package com.programmingtest.Car_Rental.controller;

import com.programmingtest.Car_Rental.dto.BookDTO;
import com.programmingtest.Car_Rental.dto.CarDTO;
import com.programmingtest.Car_Rental.dto.UserDTO;
import com.programmingtest.Car_Rental.service.admin.AdminServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
@CrossOrigin("http://localhost:4200")
public class AdminController {

    private final AdminServiceImpl adminService;

    @PostMapping(value = "/car")
    public ResponseEntity<?> publishCar(@ModelAttribute CarDTO carDTO){
        boolean result = adminService.publishCar(carDTO);
        if(result){
            return new ResponseEntity<>(HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping(value = "/car")
    public ResponseEntity<List<CarDTO>> getAll(){
        List<CarDTO> result = adminService.getAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/car/{id}")
    public ResponseEntity<CarDTO> getCarById(@PathVariable Long id){
        CarDTO result = adminService.getCarById(id);
        return ResponseEntity.ok(result);
    }


    @DeleteMapping("/car/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable Long id){
        adminService.deleteCar(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/car")
    public ResponseEntity<?> updateCar(@ModelAttribute CarDTO carDTO){
        boolean result = adminService.updateCar(carDTO);
        if(result){
            return new ResponseEntity<>(HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<BookDTO>> getAllBookings(){
        List<BookDTO> result = adminService.getAllBookings();
        if(!result.isEmpty()){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else{
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id){
        UserDTO result = adminService.getUserById(id);
        if(result != null){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else{
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/bookings/status/{id}/{status}")
    public ResponseEntity<?> changeStatus(@PathVariable Long id, @PathVariable String status){
        boolean result = adminService.changeBookStatus(id, status);
        if(result){
            return new ResponseEntity<>(HttpStatus.OK);
        }else{
            return ResponseEntity.badRequest().build();
        }
    }
}
