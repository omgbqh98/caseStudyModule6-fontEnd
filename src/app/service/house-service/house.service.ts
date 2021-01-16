import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private http: HttpClient) { }

  getAllHouse(): Observable<any> {
    return this.http.get(API_URL + '/houses');
  }
}
