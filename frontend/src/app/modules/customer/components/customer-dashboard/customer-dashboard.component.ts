import { Component, OnInit } from '@angular/core';
import { CarDTO } from 'src/app/modules/admin/dto/cardto';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit{

  failure = false;
  message?: string;
  cars: CarDTO[] = [];

  constructor(private customerService: CustomerService){}

  ngOnInit(): void {
    this.getAll();
  }


  getAll(){
    this.customerService.getAll().subscribe({
      next: (result) =>{
        this.cars = [];
        result.forEach(element => {
          element.returnedImage = 'data:image/jpeg;base64,' + element.returnedImage;
          this.cars.push(element)
        });
      },
      error: (error) =>{
        this.failure = true;
        this.message = error.statusText;
      }
    })
  }

}
