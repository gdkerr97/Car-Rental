import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDTO } from '../../dto/cardto';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit{

  brands: Array<string> = ['BMW', 'AUDI', 'FERRARI', 'TESLA', 'VOLVO', 'TOYOTA', 'HONDA', 'FORD', 'NISSAN', 'HYUNDAI', 'LEXUS', 'KIA'];
  types: Array<string> = ['Petrol', 'Hybrid', 'Diesel', 'Electric', 'CNG'];
  colors: Array<string> = ['Red', 'White', 'Blue', 'Black', 'Orange', 'Grey', 'Silver'];
  transmissions: Array<string> = ['Manual', 'Automatic'];
  selectedFile = new File(["asdasdsdffdas"], "filename");
  imagePreview?: string | ArrayBuffer | null;
  success = false;
  failure = false;
  publishForm!: FormGroup;

  constructor(private adminService: AdminService, private activatedRoute: ActivatedRoute, private router: Router){
  }

  // prendo l'id passato nell'url della richiesta
  id: number = this.activatedRoute.snapshot.params["id"];

  ngOnInit(): void {
      this.getCarById();
      this.publishForm = new FormGroup({
        id: new FormControl(this.id, Validators.required),
        name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
        brand: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
        transmission: new FormControl('', Validators.required),
        color: new FormControl('', Validators.required),
        year: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
        price: new FormControl('', Validators.required)
       })
  }


  getCarById(){
    this.adminService.getCarById(this.id).subscribe({
      next: (result) =>{ 
        this.publishForm.patchValue(result);
      },
      error: (error) =>{
        console.log(error);
      }
    })
  }

  get name(){
    return this.publishForm.get('name');
   }
   get brand(){
    return this.publishForm.get('brand');
   }
  
   get type(){
    return this.publishForm.get('type');
   }
  
   get transmission(){
    return this.publishForm.get('transmission');
   }
  
   get color(){
    return this.publishForm.get('color');
   }
  
   get year(){
    return this.publishForm.get('year');
   }
  
   get price(){
    return this.publishForm.get('price');
   }


  publish(){
    var car = new FormData();
    car.append('id', this.publishForm.value.id);
    car.append('name', this.publishForm.value.name);
    car.append('brand', this.publishForm.value.brand);
    car.append('type', this.publishForm.value.type);
    car.append('color', this.publishForm.value.color);
    car.append('year', this.publishForm.value.year);
    car.append('transmission', this.publishForm.value.transmission);
    car.append('price', this.publishForm.value.price);
    car.append('image', this.selectedFile);

    this.adminService.updateCar(car).subscribe({
      next: (result) =>{
        this.success = true;
        setTimeout(() =>{this.router.navigate(['/admin/dashboard']); }, 5000);
      },
      error: (error) =>{
        this.failure = true;
      }
    })
  }

}
