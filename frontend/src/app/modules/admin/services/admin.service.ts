import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDTO } from '../dto/cardto';
import { environment } from 'src/app/environment/environment';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { BookDTO } from '../dto/bookdto';
import { UserDTO } from '../dto/userdto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  publishCar(formData: FormData): Observable<any>{
    
    return this.http.post<CarDTO>(environment.BASE_URL + '/api/admin/car', formData, {
      headers: StorageService.createAuthHeaders()
    });
  }

  getAll(): Observable<CarDTO[]>{
    return this.http.get<CarDTO[]>(environment.BASE_URL + '/api/admin/car', {
      headers: StorageService.createAuthHeaders()
    });
  }

  deleteCar(id?: number): Observable<any>{
    return this.http.delete(environment.BASE_URL + '/api/admin/car/' + id, {
      headers: StorageService.createAuthHeaders()
    })
  }

  getCarById(id?: number): Observable<CarDTO>{
    return this.http.get<CarDTO>(environment.BASE_URL + '/api/admin/car/' + id, {
      headers: StorageService.createAuthHeaders()
    })
  }

  updateCar(car: FormData): Observable<any>{
    return this.http.put(environment.BASE_URL + '/api/admin/car', car, {
      headers: StorageService.createAuthHeaders()
    })
  }

  getAllBookings(): Observable<BookDTO[]>{
    return this.http.get<BookDTO[]>(environment.BASE_URL + '/api/admin/bookings', {
      headers: StorageService.createAuthHeaders()
    })
  }

  getUserById(id: number): Observable<UserDTO>{
    return this.http.get<UserDTO>(environment.BASE_URL + '/api/admin/user/' + id, {
      headers: StorageService.createAuthHeaders()
    })
  }

  changeStatus(id: number, status: string): Observable<any>{
    return this.http.put(environment.BASE_URL + '/api/admin/bookings/status/' + id + '/' + status, {}, {
      headers: StorageService.createAuthHeaders()
    })
  }
}
