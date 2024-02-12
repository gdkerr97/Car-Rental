import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarDTO } from '../../dto/cardto';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-publish-car',
  templateUrl: './publish-car.component.html',
  styleUrls: ['./publish-car.component.css']
})
export class PublishCarComponent implements OnInit{

  brands: Array<string> = ['BMW', 'AUDI', 'FERRARI', 'TESLA', 'VOLVO', 'TOYOTA', 'HONDA', 'FORD', 'NISSAN', 'HYUNDAI', 'LEXUS', 'KIA'];
  types: Array<string> = ['Petrol', 'Hybrid', 'Diesel', 'Electric', 'CNG'];
  colors: Array<string> = ['Red', 'White', 'Blue', 'Black', 'Orange', 'Grey', 'Silver'];
  transmissions: Array<string> = ['Manual', 'Automatic'];
  selectedFile!: File;
  imagePreview?: string | ArrayBuffer | null;
  success = false;
  failure = false;
 
  publishForm!: FormGroup;

  constructor(private adminService: AdminService){}

 ngOnInit(): void {
     this.publishForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      brand: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      transmission: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      year: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      price: new FormControl('', Validators.required)
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

 onFileSelected(event: any){
  this.selectedFile = event.target.files[0];
  this.previewImage();
 }

 previewImage(){
  const reader = new FileReader();
  reader.onload = () =>{
    this.imagePreview = reader.result;
  }

  reader.readAsDataURL(this.selectedFile);
 }

 publish(){

  var formData = new FormData();
  formData.append('name', this.publishForm.value.name);
  formData.append('brand', this.publishForm.value.brand);
  formData.append('type', this.publishForm.value.type);
  formData.append('color', this.publishForm.value.color);
  formData.append('year', this.publishForm.value.year);
  formData.append('transmission', this.publishForm.value.transmission);
  formData.append('price', this.publishForm.value.price);
  formData.append('image', this.selectedFile);


  this.adminService.publishCar(formData).subscribe({
    next: (result) =>{
      this.success = true;
      console.log(result);
    },
    error: (error) =>{
      this.failure = true;
      console.log(error);
    }
  })


 }

}
