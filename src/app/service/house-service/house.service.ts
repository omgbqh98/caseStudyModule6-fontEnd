import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {House} from '../../model/house-model/house';
import {Booking} from '../../model/booking-model/booking';
import {HousesImg} from '../../model/house-model/housesImg';
import {Search} from '../../model/search-house/search';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class HouseService {
  messageSource = new BehaviorSubject<[]>([]);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  changeMessage(message: House[]) {
    // @ts-ignore
    this.messageSource.next(message);
  }

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

  // getRatingByHouse(id: number): Observable<any> {
  //   return this.http.get(API_URL + '/houses' + `/${id}` + '/ratings');
  // }
  //
  // getParentRatingByHouse(id: number): Observable<any> {
  //   return this.http.get(API_URL + '/houses' + `/${id}` + '/parentRatings');
  // }
  //
  // getChildRatingByHouse(id: number): Observable<any> {
  //   return this.http.get(API_URL + '/houses' + `/${id}` + '/childRatings');
  // }
  //
  // getChildRatingByParentRating(id: number): Observable<any> {
  //   return this.http.get(API_URL + '/houses' + '/childRatings' + `/${id}`);
  // }
  getAllHouseImg(id: number): Observable<HousesImg> {
    return this.http.get<HousesImg>(API_URL + '/housesImg' + '/detail/' + id);
  }

  search_House(search: Search): Observable<any> {
    return this.http.post(API_URL + '/houses' + '/search', search);
  }

  getBestHouses(): Observable<any> {
    return this.http.get(API_URL + '/houses' + '/bestHouses');
  }

  getAllCities(): Observable<any> {
    return this.http.get('https://thongtindoanhnghiep.co/api/city');
  }

  getAllDistrictsByCity(id: number): Observable<any>{
    return this.http.get('https://thongtindoanhnghiep.co/api/city' + `/${id}` + '/district');
  }

  getAllWardsByDistrict(id: number): Observable<any>{
    return this.http.get('https://thongtindoanhnghiep.co/api/district' + `/${id}` + '/ward');
  }
}
