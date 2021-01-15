import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
// @ts-ignore
import {AuthService} from '../service/authen-service/auth.service';
import {Observable} from 'rxjs';
@Injectable()
export class JwtInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUserValue;
    // @ts-ignore
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          // @ts-ignore
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }
    return next.handle(request);
  }
}
