import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {House} from '../../model/house-model/house';
import {Booking} from '../../model/booking-model/booking';
import {HousesImg} from '../../model/house-model/housesImg';
const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private http: HttpClient) { }

  getAllHouse(): Observable<any> {
    return this.http.get(API_URL + '/houses');
  }

  getDetailHouse(id: number): Observable<any> {
    return this.http.get(API_URL + '/houses' + `/${id}`);
  }

  create(house: House): Observable<any> {
    return this.http.post<House>(API_URL + '/houses', house);
  }

  getOwnedHouse(id: number): Observable<any>{
    return this.http.get(API_URL  + '/users' + `/${id}` + '/ownHouses');
  }

  updateHouse(house: House): Observable<any> {
    return this.http.put<House>(API_URL + '/houses' + `/${house.houseId}`, house);
  }

  getBookingByHouse(id: number): Observable<any> {
    return this.http.get(API_URL + '/houses' + `/${id}` + '/bookings');
  }

  getAllNewHouse(): Observable<any> {
    return this.http.get(API_URL + '/houses/listHouseNew');
  }

  getRatingByHouse(id: number): Observable<any> {
    return this.http.get(API_URL + '/houses' + `/${id}` + '/ratings');
  }

  getParentRatingByHouse(id: number): Observable<any> {
    return this.http.get(API_URL + '/houses' + `/${id}` + '/parentRatings');
  }

  getChildRatingByHouse(id: number): Observable<any> {
    return this.http.get(API_URL + '/houses' + `/${id}` + '/childRatings');
  }

  getChildRatingByParentRating(id: number): Observable<any> {
    return this.http.get(API_URL + '/houses' + '/childRatings' + `/${id}`);
  }

  upgrade(id: number): Observable<any> {
    return this.http.get(API_URL + '/houses' + '/upgrade' + `/${id}`);
  }
  getAllHouseImg(id : number) : Observable<HousesImg>{
    return this.http.get<HousesImg>(API_URL + '/housesImg' + '/detail/'+ id)
  }
}
