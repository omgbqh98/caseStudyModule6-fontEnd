import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {UserService} from '../../../service/user-service/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Rating} from '../../../model/rating-model/rating';
import {User} from '../../../model/user-model/user';
import {House} from '../../../model/house-model/house';
import {Timestamp} from 'rxjs';
import {RatingService} from '../../../service/rating-service/rating.service';

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
              private fb: FormBuilder,
              private ratingService: RatingService) { }
  ngOnInit(): void {
    this.rateForm = this.fb.group({
      userId: [''],
      houseId: [''],
      rate: [''],
      review: [''],
      bookingId: [''],
    });
    this.checkIfNotRated();
  }
  // tslint:disable-next-line:typedef
  checkIfNotRated() {
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

  // tslint:disable-next-line:typedef
  createRate() {
    const newRate = this.rateForm.value;
    newRate.review = this.rateForm.value.review;
    newRate.rate = this.rateForm.value.review;
    newRate.userId = this.user;
    newRate.houseId = this.rateForm.value.houseId;
    newRate.bookingId = this.rateForm.value.bookingId;
    this.ratingService.createNewRating(newRate).subscribe((data) => {
      console.log('Kết quả' + data);
      alert('Thank you for your feedback!');
      this.checkIfNotRated();
    });
  }

  // hideRateForm() {
  //   this.isShow = true;
  // }
}
