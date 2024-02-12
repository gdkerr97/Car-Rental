import { Injectable } from '@angular/core';
import { AuthDTO } from '../../dto/authdto';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

const TOKEN = 'token';
const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor() { }

  static saveToken(token: string): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: AuthDTO): void{
      window.localStorage.removeItem(USER);
      window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(){
    return window.localStorage.getItem(TOKEN);
  }

  static getUser(): any{
    if(window.localStorage.getItem(USER)){
      return JSON.parse(window.localStorage.getItem(USER)!);
    }else{
      return null;
    }
  }

  static getRole(){
    const user = this.getUser();
    if(user){
      return user.role;
    }else{
      return '';
    }
  }

  static getId(){
    const user = this.getUser();
    if(user){
      return user.id;
    }else{
      return null;
    }
  }

  static isAdminLogged(): boolean{
    
    if(this.getRole() === 'ADMIN'){
      return true;
    }else{
      return false;
    }
  }

  static isCustomerLogged(): boolean{

    if(this.getRole() === 'CUSTOMER'){
      return true;
    }else{
      return false;
    }
  }

  static logout(): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

  static createAuthHeaders(): HttpHeaders{
    let header: HttpHeaders = new HttpHeaders({'Authorization': 'Bearer ' + this.getToken()});
    return header;
  }


}
