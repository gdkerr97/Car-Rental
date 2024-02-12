import { Component, OnInit } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'car_rental_angular';
  isAdminLogged: boolean = StorageService.isAdminLogged();
  isCustomerLogged: boolean = StorageService.isCustomerLogged();

  constructor(private router: Router){}

ngOnInit(): void {
    this.router.events.subscribe(event =>{ 
      if(event.constructor.name === 'NavigationEnd'){
        this.isAdminLogged = StorageService.isAdminLogged();
        this.isCustomerLogged = StorageService.isCustomerLogged();
      }
    })
}

logout(): void{
  StorageService.logout();
  this.router.navigate(['/']);
}

}
