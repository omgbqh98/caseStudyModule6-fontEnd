import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Booking} from '../../model/booking-model/booking';
const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }
  getBookingByUserId(id: number): Observable<any> {
    return this.http.get(API_URL + '/users' + `/${id}` + '/booking');
  }

  getDetailHouse(id: number): Observable<any> {
    return this.http.get(API_URL + '/houses' + `/${id}`);
  }

  createBooking(booking: Booking): Observable<any> {
    // @ts-ignore
    return this.http.post('http://localhost:8080/booking-hotel', booking);
  }

  getListBookingByHouseId(id: number): Observable<any> {
    return this.http.get(API_URL + '/list-booking-by-houseId' + `/${id}`);
  }

  cancelBooking(id: number): Observable<Booking> {
    return this.http.delete(API_URL + '/houses/cancel' + `/${id}`);
  }

  checkIn(id: number): Observable<any> {
    return this.http.get(API_URL + '/houses/checkIn/' + `${id}`);
  }
  finById(id: number): Observable<any> {
    return this.http.get(API_URL + '/houses/getBooking' + `${id}`);
  }

  checkout(): Observable<any> {
    return this.http.get(API_URL + '/checkout');
  }

  checkHired(): Observable<any> {
    return this.http.get(API_URL + '/checkHired');
  }
}
