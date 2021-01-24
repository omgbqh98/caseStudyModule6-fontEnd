import {Component, OnInit, ViewChild} from '@angular/core';
// @ts-ignore
import {Datepicker} from '@mobiscroll/angular';
import {HouseService} from '../../../../../service/house-service/house.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {House} from '../../../../../model/house-model/house';
import {BookingService} from '../../../../../service/booking-service/booking.service';
import {Booking} from '../../../../../model/booking-model/booking';
import th from '@mobiscroll/angular/dist/js/i18n/th';
import {User} from '../../../../../model/user-model/user';
import {AuthService} from '../../../../../service/authen-service/auth.service';
import {UserService} from '../../../../../service/user-service/user.service';
import {any} from 'codelyzer/util/function';

const now = new Date();

@Component({
  selector: 'app-booking-hotel',
  templateUrl: './booking-hotel.component.html',
  styleUrls: ['./booking-hotel.component.css']
})
export class BookingHotelComponent implements OnInit {
  // @ts-ignore
  bookingNow: Booking = {
    checkIn: '',
    checkOut: '',
    total: -1,
  };
  arrayBooked: Booking[] = [];

  constructor(private houseService: HouseService
    ,
              private activatedRoute: ActivatedRoute
    ,
              private bookingService: BookingService
    ,
              private authService: AuthService
    ,
              private userService: UserService,
              private router: Router
  ) {
  }

  @ViewChild('calInst')
  inst
    :
    Datepicker;
  min = now;
  max = new Date(now.getFullYear(), now.getMonth() + 12, now.getDate());
// tslint:disable-next-line:variable-name
  date_time: any;
// @ts-ignore
  currentUser: User;
// @ts-ignore
  house: House;
// @ts-ignore
  user: User;
// @ts-ignore
  id: number;
// @ts-ignore
  startString: string;
// @ts-ignore
  endString: string;
  days: any;
  showButtonBooking = false;
  start: any;
  end: any;
// @ts-ignore
  arrayStart: string[];
// @ts-ignore
  arrayEnd: string[];
  showStart = '';
  showEnd = '';
  // @ts-ignore
  count = 0;
  isError = false;
  show = '';
  total = 0;

// tslint:disable-next-line:typedef
  getValue() {
    console.log(this.date_time);
    this.start = this.date_time[0];
    this.end = this.date_time[1];
    if (this.start != null && this.end != null) {
      this.days = Math.round(((this.end - this.start) / (1000 * 60 * 60 * 24)) * 1000) / 1000;
      // @ts-ignore
      this.total = this.days * this.house.price;
    }
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = paramMap.get('id');

      this.houseService.getDetailHouse(this.id).subscribe((result) => {
        this.house = result;
        // @ts-ignore
        this.currentUser = JSON.parse(localStorage.getItem('user'));
        // @ts-ignore
        console.log(this.currentUser);
        // @ts-ignore
        this.userService.getUserProfile(this.currentUser.username).subscribe(value => this.user = value);
      });
    });
  }

  booking(): void {
    if (this.user == null) {
      this.router.navigate(['/login']);
    } else {
      // @ts-ignore
      this.bookingService.getListBookingByHouseId(this.house.houseId).subscribe((result) => {
        this.arrayBooked = result;
        // @ts-ignore
        this.bookingNow.userId = this.user;
        // @ts-ignore
        this.bookingNow.houseId = this.house;
        this.startString = this.date_time[0].toLocaleDateString();
        this.endString = this.date_time[1].toLocaleDateString();
        this.arrayStart = this.startString.split('/');
        console.log(this.startString);
        this.arrayEnd = this.endString.split('/');
        if (this.arrayStart[0].length === 1) {
          this.bookingNow.checkIn = this.arrayStart[2] + '-0' + this.arrayStart[0] + '-' + this.arrayStart[1];
        } else {
          this.bookingNow.checkIn = this.arrayStart[2] + '-' + this.arrayStart[0] + '-' + this.arrayStart[1];
        }
        if (this.arrayEnd[0].length === 1) {
          this.bookingNow.checkOut = this.arrayEnd[2] + '-0' + this.arrayEnd[0] + '-' + this.arrayEnd[1];
        } else {
          this.bookingNow.checkOut = this.arrayEnd[2] + '-' + this.arrayEnd[0] + '-' + this.arrayEnd[1];
        }
        // @ts-ignore
        this.bookingNow.total = this.days * this.house.price;
        if (this.arrayBooked != null) {
          if (this.checkBooking(this.arrayStart, this.arrayEnd, this.arrayBooked) === 'ok') {
            this.bookingService.createBooking(this.bookingNow).subscribe(() => {
            });
          }
        } else {
          this.bookingService.createBooking(this.bookingNow).subscribe(() => {
            this.show = 'Congratulation! You booked successfully!';
          });
        }
      });
    }
  }

  checkBooking(arrayStart: string[], arrayEnd: string[], arrayBooked: Booking []): any {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arrayBooked.length; i++) {
      const indexStart = arrayBooked[i].checkIn.toString().split('-');
      const indexEnd = arrayBooked[i].checkOut.toString().split('-');
      if ((Number(arrayStart[2])) > (Number(indexEnd[0]))) {
        this.count += 1;
        this.isError = true;
      }
      if ((Number(arrayStart[2])) === (Number(indexEnd[0]))) {
        if ((Number((arrayStart[0]))) > (Number(indexEnd[1]))) {
          this.count += 1;
          this.isError = true;
        }
        if ((Number((arrayStart[0]))) === (Number(indexEnd[1]))) {
          if ((Number((arrayStart[1]))) >= (Number(indexEnd[2]))) {
            this.count += 1;
            this.isError = true;
          }
        }
      }
      if ((Number(arrayEnd[2])) < (Number(indexStart[0]))) {
        this.count += 1;
        this.isError = true;
      }
      if ((Number(arrayEnd[2])) === (Number(indexStart[0]))) {
        if ((Number((arrayEnd[0]))) < (Number(indexStart[1]))) {
          this.count += 1;
          this.isError = true;
        }
        if ((Number((arrayEnd[0]))) === (Number(indexStart[1]))) {
          if ((Number((arrayEnd[1]))) <= (Number(indexStart[2]))) {
            this.count += 1;
            this.isError = true;
          }
        }
      }
      if (!this.isError) {
        this.showStart = arrayBooked[i].checkIn.toString();
        this.showEnd = arrayBooked[i].checkOut.toString();
        this.show = 'From ' + this.showStart + ' to ' + this.showEnd + ' this house has been booked.';
        this.count = 0;
        return 'no';
      }
      this.isError = false;

    }
    if (this.count === this.arrayBooked.length) {
      this.show = 'Congratulation! You booked successfully!';
      this.count = 0;
      return 'ok';
    }
  }
}
