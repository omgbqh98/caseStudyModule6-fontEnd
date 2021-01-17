import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HouseService} from '../../../../../service/house-service/house.service';
import {Router} from '@angular/router';
import {House} from '../../../../../model/house-model/house';
import {UserService} from '../../../../../service/user-service/user.service';
import {AuthService} from '../../../../../service/authen-service/auth.service';
import {User} from '../../../../../model/user-model/user';
import {UserToken} from '../../../../../model/user-model/user-token';

@Component({
  selector: 'app-create-house',
  templateUrl: './create-house.component.html',
  styleUrls: ['./create-house.component.css']
})
export class CreateHouseComponent implements OnInit {
  // @ts-ignore
  createHouseForm: FormGroup;
  user: any;
  // @ts-ignore
  currentUser: UserToken;
  constructor(private fb: FormBuilder,
              private houseService: HouseService,
              private router: Router,
              private authService: AuthService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.createHouseForm = this.fb.group({
      houseName: [''],
      type: [''],
      address: [''],
      description: [''],
      price: [''],
      bedroom: [''],
      bathroom: [''],
      status: [''],
    });
  }
  // tslint:disable-next-line:typedef
  createHouse() {
    const house: House = this.createHouseForm.value;
    this.authService.currentUser.subscribe(value => {
      this.userService.getUserByUsername(value.username).subscribe(value1 => {
        this.user = value1;
      });
    });
    house.ownerId = this.user;
    this.houseService.create(house).subscribe(() => {
      console.log(house.houseName);
      alert('Create successfully!');
    });
  }

}
