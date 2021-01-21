import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {UserService} from '../../../service/user-service/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Rating} from '../../../model/rating-model/rating';
import {User} from '../../../model/user-model/user';
import {House} from '../../../model/house-model/house';
import {Timestamp} from 'rxjs';

@Component({
  selector: 'app-rating-create',
  templateUrl: './rating-create.component.html',
  styleUrls: ['./rating-create.component.css']
})
export class RatingCreateComponent implements OnInit {
  currentUser: any;
  user: any;
  notRatedBookingList: any;
  rateForm: FormGroup;
  // isShow = true;
  constructor(private userService: UserService,
              private fb: FormBuilder) { }
  ngOnInit(): void {
    this.rateForm = this.fb.group({
      userId: [''],
      houseId: [''],
      rate: [''],
      review: ['']
    });
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

  createRate() {
    const newRate = this.rateForm.value;
    newRate.review = this.rateForm.value.review;
    newRate.rate = this.rateForm.value.review;
    newRate.userId = this.user;
    newRate.houseId = this.rateForm.value.houseId;
    console.log(newRate.review);
    alert('Thank you for your feedback!');
    // this.userService.getUserProfile(this.currentUser.username).subscribe(value => {
    //   this.user = value;
    //   if (this.user) {
    //     this.userService.findNotRatedBookingByUser(this.user.userId).subscribe((data) => {
    //       this.notRatedBookingList = data;
    //       console.log('list chưa rate' + this.notRatedBookingList);
    //     });
    //   }
    // });
  }

  // hideRateForm() {
  //   this.isShow = true;
  // }
}
