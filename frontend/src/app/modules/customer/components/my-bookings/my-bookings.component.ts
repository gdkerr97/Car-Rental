import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { BookDTO } from 'src/app/modules/admin/dto/bookdto';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit{

  failure = false;
  success = false;
  message = '';
  books: BookDTO[] = [];

  constructor(private customerService: CustomerService){}

  ngOnInit(): void {
    this.getBookings();
      
  }


  getBookings(){
    this.books = [];
    this.customerService.getBookingsByUserId(StorageService.getId()).subscribe({
      next: (result) =>{
        result.forEach(element => this.books.push(element));
      },
      error: (error) =>{
        this.failure = true;
        this.message = error.statusText;
      }
    })
  }

}
