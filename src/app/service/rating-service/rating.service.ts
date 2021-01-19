import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

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
}
