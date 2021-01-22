import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user-model/user';
import {UserToken} from '../../model/user-model/user-token';
import {BookingService} from '../../service/booking-service/booking.service';
import {AuthService} from '../../service/authen-service/auth.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Booking} from '../../model/booking-model/booking';
import {UserService} from '../../service/user-service/user.service';
import {error} from '@angular/compiler/src/util';

@Component({
  selector: 'app-history-booking',
  templateUrl: './history-booking.component.html',
  styleUrls: ['./history-booking.component.css']
})
export class HistoryBookingComponent implements OnInit {
  // @ts-ignore
  user: User;
  // @ts-ignore
  currentUser: UserToken;
  // @ts-ignore
  booking: any;
  // @ts-ignore
  listBooking: any;
  total: any;
  clicked = false;
  // @ts-ignore
  show = '';
  showCancelSuccess = '';
  p = 1;

  constructor(private bookingService: BookingService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.bookingService.checkHired().subscribe(() => {
    });
    this.bookingService.checkout().subscribe(() => {
      // alert('nhà bạn thuê đã hết hạn');
      // tslint:disable-next-line:no-shadowed-variable
    }, error => {
      alert('bạn cần book lại');
    });
    // @ts-ignore
    this.authService.currentUser.subscribe(value => {
      this.currentUser = value;
      // @ts-ignore
      this.userService.getUserByUsername(value.username).subscribe(value1 => {
        this.user = value1;
        // @ts-ignore
        this.getBooking(this.user.userId);
        console.log('id' + this.user.userId);
        console.log(this.user.username);
        // this.cancelBooking(this.booking.bookingId);
      });
    });
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  checkIn(id) {
    this.bookingService.checkIn(id).subscribe(() => {
      // this.show = 'Check In successfully!';
      // alert('Check In successfully!');
      this.show = 'Check In successfully!';
      // @ts-ignore
      this.getBooking(this.user.userId);
    }, error1 => {
      // alert('House has expired, book now !');
      this.show = 'House has expired, book now !';
    });
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  cancelBooking(id) {
    this.bookingService.cancelBooking(id).subscribe(() => {
      // alert('huy thanh cong');
      // @ts-ignore
      this.show = 'Canceled successfully!';
      // @ts-ignore
      this.getBooking(this.user.userId);
      // tslint:disable-next-line:no-shadowed-variable
    }, error => {
      // @ts-ignore
      this.show = 'Expired cancellation !';
      console.log(error);
      // @ts-ignore
      this.getBooking(this.user.userId);
    });
    // @ts-ignore
  }

  // @ts-ignore
  getBooking(id: number): Booking[] {
    // @ts-ignore
    this.bookingService.getBookingByUserId(id).subscribe((data) => {
      console.log(this.user.userId);
      this.listBooking = data;
      console.log(this.listBooking);
      return this.listBooking;
    });
  }

  // tslint:disable-next-line:typedef
  sum(): number {
    let sum = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listBooking.length; i++) {
      sum += this.listBooking[i].total;
    }
    return sum;
  }
}
