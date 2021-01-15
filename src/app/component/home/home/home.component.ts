import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/user';
import {UserService} from '../../../service/user.service';
import {AuthService} from '../../../service/auth.service';
import {UserToken} from '../../../model/user-token';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
// @ts-ignore
   user: User;
  // @ts-ignore
   userCurrent: UserToken;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // @ts-ignore
    this.userCurrent = JSON.parse(localStorage.getItem('user'));
    // @ts-ignore
    console.log(this.userCurrent);
    // @ts-ignore
    this.userService.getUserProfile(this.userCurrent.username).subscribe(value => this.user = value);
    console.log(this.user);
  }
}
