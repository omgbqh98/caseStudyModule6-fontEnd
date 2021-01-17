import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
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
}
