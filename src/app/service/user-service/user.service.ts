import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/user-model/user';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAllUser(): Observable<any> {
    return this.http.get(API_URL);
  }

  updateProfile(user: User): Observable<any> {
    return this.http.put(API_URL + `/${user.userId}`, user);
  }

  finById(id: number): Observable<any> {
    return this.http.get(API_URL + `/users/${id}`);
  }

  getUserProfile(username: string): Observable<User> {
    // @ts-ignore
    return this.http.get<User>(API_URL + `/${username}`);
  }
  getUserByUsername(username: any): Observable<any> {
    return this.http.get(API_URL + `/${username}`);
  }
  updateUser(user: User): Observable<any> {
    return this.http.put(API_URL + `/users/update`, user);
  }

  getUserProfileById(id: number): Observable<any> {
    return this.http.get(API_URL + '/users' + `/${id}`);
  }

  newPassword(user: User, id: number): Observable<User> {
    return this.http.put<User>(API_URL + `/changePassword/${id}`, user);
  }
  updateUserProfile(id: number, user: User): Observable<User> {
    return this.http.put<User>(API_URL + `/users/${id}`, user);
  }

  findNotRatedBookingByUser(id: number): Observable<any> {
    return this.http.get(API_URL + '/users' + `/${id}` + '/bookingNotRateThreeMonths');
  }

  findAllOwner(): Observable<any> {
    return this.http.get(API_URL + '/users/owners');
  }
}
