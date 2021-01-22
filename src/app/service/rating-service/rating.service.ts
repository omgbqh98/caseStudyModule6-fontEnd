import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Rating} from '../../model/rating-model/rating';
const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  getRatingByHouse(id: number): Observable<any> {
    return this.http.get(API_URL + '/houses' + `/${id}` + '/ratings');
  }

  getParentRatingsByHouse(id: number): Observable<any> {
    return this.http.get(API_URL + '/houses' + `/${id}` + '/parentRatings');
  }

  getChildRatingByHouse(id: number): Observable<any> {
    return this.http.get(API_URL + '/houses' + `/${id}` + '/childRatings');
  }

  getChildRatingByParentRating(id: number): Observable<any> {
    return this.http.get(API_URL + '/houses' + '/childRatings' + `/${id}`);
  }

  getCheckedOutAndRatedUserByHouse(id: number): Observable<any> {
    return this.http.get(API_URL + '/houses' + `/${id}` + '/checkedOutRatedUser');
  }

  getCheckedOutUserByHouse(id: number): Observable<any> {
    return this.http.get(API_URL + '/houses' + `/${id}` + '/checkedOutUser');
  }

  createNewComment(rating: Rating): Observable<any> {
    // @ts-ignore
    return this.http.post<Rating>(API_URL + '/houses' + '/createComment', rating);
  }

  createNewRating(rating: Rating): Observable<any> {
    return this.http.post<Rating>(API_URL + '/houses' + '/createRating', rating);
  }
}
