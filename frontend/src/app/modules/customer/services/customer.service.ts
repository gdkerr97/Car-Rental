import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDTO } from '../../admin/dto/cardto';
import { environment } from 'src/app/environment/environment';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { BookDTO } from '../../admin/dto/bookdto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<CarDTO[]>{
    return this.http.get<CarDTO[]>(environment.BASE_URL + '/api/customer/car', {
      headers: StorageService.createAuthHeaders()
    })
  }

  bookCar(bookDTO: BookDTO): Observable<any>{
    return this.http.post(environment.BASE_URL + '/api/customer/car/book', bookDTO, {
      headers: StorageService.createAuthHeaders()
    })
  }

  getCarById(id: number): Observable<CarDTO>{
    return this.http.get<CarDTO>(environment.BASE_URL + '/api/customer/car/' + id, {
      headers: StorageService.createAuthHeaders()
    })
  }

  getBookingsByUserId(id: number): Observable<BookDTO[]>{
    return this.http.get<BookDTO[]>(environment.BASE_URL + '/api/customer/book/' + id, {
      headers: StorageService.createAuthHeaders()
    })
  }
}
