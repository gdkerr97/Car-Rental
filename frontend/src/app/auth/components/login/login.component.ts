import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { AuthDTO } from '../../dto/authdto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  success: boolean = false;
  failure: boolean = false;
  message: string = '';
  loginForm!: FormGroup;

  constructor(private router: Router, private authService: AuthService){}

ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
}

get email(){
  return this.loginForm.get('email');
}

get password(){
  return this.loginForm.get('password');
}

login(){
  console.log(this.loginForm.value);
  this.authService.login(this.loginForm.value).subscribe({
    next: (result) =>{
      this.success = true;
      if(result.userId != null){

        const user: AuthDTO = new AuthDTO(result.userId, result.userRole);

        StorageService.saveToken(result.jwt);
        StorageService.saveUser(user);
        
        if(StorageService.isAdminLogged()){
          this.router.navigate(['/admin/dashboard']);
        }else if(StorageService.isCustomerLogged()){
          this.router.navigate(['/customer/dashboard']);
        }
      }

    },
    error: (error) =>{
      this.failure = true;
      this.message = error.error;
      console.log(error)
    }
  })
}
}
