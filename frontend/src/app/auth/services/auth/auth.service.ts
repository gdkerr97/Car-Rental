import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import { Observable } from 'rxjs';
import { SignupRequestDTO } from '../../dto/signuprequestdto';
import { AuthRequestDTO } from '../../dto/authrequestdto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(signupRequest: SignupRequestDTO): Observable<any>{
    return this.http.post(environment.BASE_URL + '/api/auth/signup', signupRequest);
  }

  login(authRequest: AuthRequestDTO): Observable<any>{
    return this.http.post(environment.BASE_URL + '/api/auth/login', authRequest);
  }
}
