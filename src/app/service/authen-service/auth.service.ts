import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
// @ts-ignore
import {EventEmitter} from 'events';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserToken} from '../../model/user-model/user-token';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../../model/user-model/user';
import {GoogleToken} from '../../model/googleToken-model/GoogleToken';
import {Router} from '@angular/router';
const API_URL = `${environment.apiUrl}`;
declare var gapi: any;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // @ts-ignore
  update = new EventEmitter<string>();
  private currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;

  constructor(private http: HttpClient  ) {
    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserToken {
    return this.currentUserSubject.value;
  }
  initGoogleOAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          client_id: '360187321088-pphmdafbluqev38ctadkfvj02v7n346p.apps.googleusercontent.com',
          fetch_basic_profile: true,
          scope: 'profile email'
        }).then(() => {
          // console.log(gapi.auth2.getAuthInstance());
          const googleAuth = gapi.auth2.getAuthInstance();
          resolve(googleAuth);
        }, (err: any) => reject(err));
      });
    });
  }
  // tslint:disable-next-line:typedef
  login(inputUser: User) {
    return this.http.post(API_URL + '/login', inputUser)
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        // @ts-ignore
        this.currentUserSubject.next(user);
        this.update.emit('login');
        return user;
      }));
  }

  // tslint:disable-next-line:typedef
  async logout() {
    localStorage.removeItem('user');
    // @ts-ignore
    const authInstance = await this.initGoogleOAuth();
    if (authInstance ) {
      authInstance.signOut().then(() => {
        console.log('sign out');
      });
    }
    this.currentUserSubject.next({});
  }

  signup(user: User): Observable<User> {
    return this.http.post<User>(API_URL + '/signup', user);
  }

  // tslint:disable-next-line:typedef
  googleSignIn(token: GoogleToken) {
    console.log(token);
    return this.http.post<any>(API_URL + '/googleSignIn', token).subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
      // @ts-ignore
      this.currentUserSubject.next(user);
      this.update.emit('login');
      window.location.href = '/';
    });
  }
}
