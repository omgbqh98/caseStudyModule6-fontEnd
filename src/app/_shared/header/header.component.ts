import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user-service/user.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/user-model/user';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../service/authen-service/auth.service';
import {UserToken} from '../../model/user-model/user-token';
import th from '@mobiscroll/angular/dist/js/i18n/th';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @ts-ignore
  currentUser: UserToken;
  // @ts-ignore
  user: User;
  // @ts-ignore
  sub: Subscription;
  userFullName = '';
  userAddress = '';
  userPhone = '';
  userEmail = '1';
  arrayPicture = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    // private db: AngularFireDatabase,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    // @ts-ignore
    console.log(this.currentUser);
    // @ts-ignore
    this.userService.getUserProfile(this.currentUser.username).subscribe(value => this.user = value);
    console.log(this.user);
    console.log(this.user.userId);
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.authService.logout();
    window.location.href = '/login';
  }
}
