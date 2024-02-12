import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CarDTO } from '../../dto/cardto';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  success = false;
  failure = false;
  cars: CarDTO[] = [];

  constructor(private adminService: AdminService){}

  ngOnInit(): void {
      this.getAll();
  }

  getAll(){
    this.adminService.getAll().subscribe({
      next: (result) =>{
        this.cars = [];
        result.forEach(element => {
          element.returnedImage = 'data:image/jpeg;base64,' + element.returnedImage;
          this.cars.push(element)
        });
      },
      error: (error) =>{
        return error;
      }
    })
  }


  deleteCar(id?: number){
    this.success = false;
    this.failure = false;
    this.adminService.deleteCar(id).subscribe({
      next: (result) =>{
        this.success = true;
        this.getAll();
      },
      error: (error) =>{
        this.failure = true;
        console.log(error);
      }
    })
  }

}
