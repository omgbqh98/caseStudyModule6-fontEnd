import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {UserService} from '../../../service/user-service/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Rating} from '../../../model/rating-model/rating';
import {User} from '../../../model/user-model/user';
import {House} from '../../../model/house-model/house';
import {Timestamp} from 'rxjs';
import {RatingService} from '../../../service/rating-service/rating.service';
import {Booking} from '../../../model/booking-model/booking';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rating-create',
  templateUrl: './rating-create.component.html',
  styleUrls: ['./rating-create.component.css']
})
export class RatingCreateComponent implements OnInit {
  currentUser: any;
  user: any;
  notRatedBookingList: any;
  // @ts-ignore
  rateForm: FormGroup;

  // isShow = true;
  constructor(private userService: UserService,
              private fb: FormBuilder,
              private ratingService: RatingService,
              private router: Router) {
  }

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
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
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
  createRate(booking: Booking, houseId: House) {
    const newRate = this.rateForm?.value;
    newRate.review = this.rateForm?.value.review;
    newRate.rate = this.rateForm?.value.rate;
    newRate.userId = this.user;
    newRate.houseId = houseId;
    newRate.bookingId = booking;
    console.log('newRate' + newRate);
    this.ratingService.createNewRating(newRate).subscribe((data) => {
      // alert('Thank you for your feedback!');
      // tslint:disable-next-line:no-shadowed-variable
      this.userService.findNotRatedBookingByUser(this.user.userId).subscribe((data) => {
        this.notRatedBookingList = data;
        console.log('list chưa rate' + this.notRatedBookingList);
        window.location.reload();
      });
    });
  }

  // hideRateForm() {
  //   this.isShow = true;
  // }
}
