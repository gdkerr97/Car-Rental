import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { BookDTO } from '../../dto/bookdto';
import { UserDTO } from '../../dto/userdto';

@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrls: ['./get-bookings.component.css']
})
export class GetBookingsComponent implements OnInit{

  bookings: BookDTO[] = [];
  success = false;
  failure = false;
  message = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getBookings();
      
  }


  getBookings(){
    this.success = false;
    this.failure = false;
    this.bookings = [];
    this.adminService.getAllBookings().subscribe({
      next: (result) =>{
        result.forEach(element => {
          this.adminService.getUserById(element.userId!).subscribe({
            next: (result) =>{
              element.username = result.name;
              element.email = result.email;
              this.bookings.push(element);
            },
            error: (error) =>{
              console.log(error);
            }
          })
        });
      },
      error: (error) =>{
        this.failure = true;
        this.message = error.statusText;
      }
    })
  }


  changeStatus(id: number, status: string){
    this.success = false;
    this.failure = false;
    this.adminService.changeStatus(id, status).subscribe({
      next: (result) =>{
        this.success = true;
        this.getBookings();
      },
      error: (error) =>{
        this.failure = true;
        this.message = error.statusText;
      }
    })
  }

}
