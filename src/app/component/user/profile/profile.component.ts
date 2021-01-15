import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../../../model/user';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // @ts-ignore
  currentUser: User;
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
    this.currentUser = {
      // @ts-ignore
      id: 1,
      firstName: 'a',
      lastName: 'b'
    };
    this.getUserProfile();
  }
  // tslint:disable-next-line:typedef
  getUserProfile() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      // @ts-ignore
      this.getUserProfileById(id);
    });
  }
  // tslint:disable-next-line:typedef
  private getUserProfileById(id: number) {
    this.userService.finById(id).subscribe(value => {
      this.currentUser = value;
      // @ts-ignore
      this.userFullName = this.currentUser.fullName;
      // @ts-ignore
      this.userAddress = this.currentUser.address;
      // @ts-ignore
      this.userPhone = this.currentUser.phone;
      // @ts-ignore
      this.userEmail = this.currentUser.email;
      // @ts-ignore
      this.arrayPicture = this.currentUser.avatar;
    }, () => {
      console.log('Loi' + this.arrayPicture);
    });
  }
}
