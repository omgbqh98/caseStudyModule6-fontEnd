import {Component, OnInit} from '@angular/core';
import {HouseService} from '../../service/house-service/house.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AuthService} from '../../service/authen-service/auth.service';
import {UserService} from '../../service/user-service/user.service';
// @ts-ignore
import {User} from '../../../../../model/user-model/user';
// @ts-ignore
import {UserToken} from '../../../../../model/user-model/user-token';

@Component({
  selector: 'app-list-rent-houses-by-time',
  templateUrl: './list-rent-houses-by-time.component.html',
  styleUrls: ['./list-rent-houses-by-time.component.css']
})
export class ListRentHousesByTimeComponent implements OnInit {
  id: any;
  bookingList: any;
  total = 0;
  p = 1;
  // @ts-ignore
  user: User;
  // @ts-ignore
  currentUser: UserToken;

  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private userService: UserService) {
    // @ts-ignore
    this.authService.currentUser.subscribe(
      // @ts-ignore
      currentUser => {
        // @ts-ignore
        this.currentUser = currentUser;
      }
    );
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.authService.currentUser.subscribe(value => {
        this.currentUser = value;
        this.userService.getUserByUsername(value.username).subscribe(value1 => {
          this.user = value1;
          this.houseService.getBookingByHouse(this.id).subscribe((bookings) => {
            this.bookingList = bookings;
            for (const booking of bookings) {
              this.total += booking.total;
            }
          });
        });
      });
    });
  }

}
