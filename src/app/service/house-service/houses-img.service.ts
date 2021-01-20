import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {HousesImg} from '../../model/house-model/housesImg';
import {Observable} from 'rxjs';
import {House} from '../../model/house-model/house';
const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class HousesImgService {

  constructor(private http: HttpClient) { }

  createHouses(housesImg: HousesImg): Observable<any>{
    return this.http.post<HousesImg>(API_URL + '/housesImg' + '/create', housesImg);
  }
}
