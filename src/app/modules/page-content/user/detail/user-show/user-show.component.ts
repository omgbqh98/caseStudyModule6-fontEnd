import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../../service/user-service/user.service';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../../../model/user-model/user';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.css']
})
export class UserShowComponent implements OnInit {
  // @ts-ignore
  currentUser: User;
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
  }
}
