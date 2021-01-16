import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {UserToken} from '../model/user-model/user-token';
// @ts-ignore
import {AuthenticationService, AuthService} from '../service/authen-service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  // @ts-ignore
  currentUser: UserToken;

  constructor(private router: Router,
              private authService: AuthService) {
    // @ts-ignore
    this.authService.currentUser.subscribe(user => {
      // @ts-ignore
      this.currentUser = user;
    });
  }

  // tslint:disable-next-line:typedef
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser) {
      return true;
    } else {
      this.router.navigate(['/login', '/'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }

  // tslint:disable-next-line:typedef
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser) {
      return true;
    } else {
      this.router.navigate(['/login', '/'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
