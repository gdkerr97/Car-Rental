import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CarDTO } from 'src/app/modules/admin/dto/cardto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookDTO } from 'src/app/modules/admin/dto/bookdto';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

@Component({
  selector: 'app-book-car',
  templateUrl: './book-car.component.html',
  styleUrls: ['./book-car.component.css']
})
export class BookCarComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService, private router: Router){}

  id: number = this.activatedRoute.snapshot.params["id"];
  actualDate: string = '';
  car: CarDTO = {};
  failure = false;
  message = '';
  bookForm!: FormGroup;
  success: boolean = false;


  ngOnInit(): void {
      this.bookForm = new FormGroup({
        fromDate: new FormControl('', Validators.required),
        toDate: new FormControl('', Validators.required)
      });
      const date: Date = new Date();
      this.actualDate = date.toISOString().split('T')[0];
      this.getCarById();
  }


  getCarById(){

    this.customerService.getCarById(this.id).subscribe({
      next: (result) =>{
        result.returnedImage = 'data:image/jpeg;base64,' + result.returnedImage;
        this.car = result;
      },
      error: (error) =>{
        this.failure = true;
        this.message = error.statusText;
      }
    })

  }

  book(){
    this.success = false;
    var book = new BookDTO();
    book.fromDate = new Date(this.bookForm.value.fromDate);
    book.toDate = new Date(this.bookForm.value.toDate);
    book.carId = this.car.id;
    book.userId = StorageService.getId();

    this.customerService.bookCar(book).subscribe({
      next: (result) =>{
        this.success = true;
        setTimeout(() => { this.router.navigate(['/customer/dashboard'])}, 5000);
      },
      error: (error) =>{
        this.failure = true;
        this.message = error.statusText;
      }
    })
  }

}
