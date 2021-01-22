import { Component, OnInit } from '@angular/core';
import {HouseService} from '../../../../../service/house-service/house.service';
import {House} from '../../../../../model/house-model/house';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AuthService} from '../../../../../service/authen-service/auth.service';
import {UserService} from '../../../../../service/user-service/user.service';

@Component({
  selector: 'app-list-own-houses',
  templateUrl: './list-own-houses.component.html',
  styleUrls: ['./list-own-houses.component.css']
})
export class ListOwnHousesComponent implements OnInit {
  listHouses: House[] = [];
  id: any;
  user: any;
  p = 1;

  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(value => {
      this.userService.getUserByUsername(value.username).subscribe(value1 => {
        this.user = value1;
        this.id = this.user.userId;
        this.houseService.getOwnedHouse(this.id).subscribe((result) => {
          this.listHouses = result;
        });
      });
    });
  }
}

