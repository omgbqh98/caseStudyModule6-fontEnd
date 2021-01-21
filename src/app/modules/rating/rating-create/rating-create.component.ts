import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {UserService} from '../../../service/user-service/user.service';

@Component({
  selector: 'app-rating-create',
  templateUrl: './rating-create.component.html',
  styleUrls: ['./rating-create.component.css']
})
export class RatingCreateComponent implements OnInit {
  currentUser: any;
  user: any;
  notRatedBookingList: any;
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    console.log('Current user' + this.currentUser);
    // @ts-ignore
    this.userService.getUserProfile(this.currentUser.username).subscribe(value => {
      this.user = value;
      if (this.user) {
        this.userService.findNotRatedBookingByUser(this.user.userId).subscribe((data) => {
          this.notRatedBookingList = data;
          console.log('list chưa rate' + this.notRatedBookingList);
        });
      }
    });
  }

}
