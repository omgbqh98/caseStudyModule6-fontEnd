import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {House} from '../../model/house-model/house';
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
}
