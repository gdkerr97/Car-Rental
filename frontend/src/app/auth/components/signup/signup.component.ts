import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signupForm!: FormGroup;
  success = false;
  failure = false;
  message = '';

  constructor(protected authService: AuthService, protected router: Router){
  }

  
  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
      }
    )
  }


  register() {
    this.success = false;
    this.failure = false;
    this.authService.register(this.signupForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.success = true;
        setTimeout(() => this.router.navigate(['/login']), 5000)
    },
    error: (err) => {
      console.log(err);
      this.failure = true;
      this.message = err.error;
    }

  })}


  get name() {
    return this.signupForm.get('name');
  }
  
  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

}
