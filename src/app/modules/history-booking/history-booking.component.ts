import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user-model/user';
import {UserToken} from '../../model/user-model/user-token';
import {BookingService} from '../../service/booking-service/booking.service';
import {AuthService} from '../../service/authen-service/auth.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Booking} from '../../model/booking-model/booking';
import {UserService} from '../../service/user-service/user.service';

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

  constructor(private bookingService: BookingService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit(): void {
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
      });
    });
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
    for (let i = 0; i < this.listBooking.length; i++) {
      sum += this.listBooking[i].total;
    }
    return sum;
  }
}
