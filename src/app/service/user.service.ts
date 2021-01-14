import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../iuser';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:8080/users';
  constructor(private http: HttpClient) { }
  getAllUser(): Observable<any> {
    return this.http.get(this.API_URL);
  }
  updateProfile(user: IUser): Observable<any> {
    return this.http.put(this.API_URL + `/${user.userId}`, user);
  }
  finById(id: number): Observable<any> {
    return this.http.get(this.API_URL + `/${id}`);
  }
}
