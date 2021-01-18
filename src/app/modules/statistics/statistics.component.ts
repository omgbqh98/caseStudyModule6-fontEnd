import {Component, OnInit} from '@angular/core';
import {StaticsticsByHousesService} from '../../service/staticstics/staticsticsByHouses/staticstics-by-houses.service';
import {StaticsticsByHouses} from '../../model/staticstics/staticstics-by-houses';
import {User} from '../../model/user-model/user';
import {UserToken} from '../../model/user-model/user-token';
import {AuthService} from '../../service/authen-service/auth.service';
import {UserService} from '../../service/user-service/user.service';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  // @ts-ignore
  listStaticsticsByHouses: StaticsticsByHouses[] = [];
  // @ts-ignore
  currentUser: UserToken;
  // @ts-ignore
  user: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private staticsticsByHousesService: StaticsticsByHousesService) {
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
        // @ts-ignore
        console.log('id' + this.user.userId);
        console.log(this.user.userId);
        console.log(this.user.username);
      });
    });
  }

  // @ts-ignore
  getBooking(id: number): StaticsticsByHouses[] {
    // @ts-ignore
    this.staticsticsByHousesService.staticsticsByHouses(id).subscribe((data) => {
      console.log(data);
      this.listStaticsticsByHouses = data;
      console.log(this.listStaticsticsByHouses);
      console.log(this.user.userId);
      return this.listStaticsticsByHouses;
    });
  }

}
