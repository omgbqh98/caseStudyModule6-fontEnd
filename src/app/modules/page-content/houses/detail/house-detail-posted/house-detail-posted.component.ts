import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../../service/authen-service/auth.service';
import {UserService} from '../../../../../service/user-service/user.service';
import {HouseService} from '../../../../../service/house-service/house.service';

import {House} from '../../../../../model/house-model/house';
import {User} from '../../../../../model/user-model/user';
import {ActivatedRoute, Params} from '@angular/router';
import {AppRoutingModule} from '../../../../../app-routing.module';

@Component({
  selector: 'app-house-detail-posted',
  templateUrl: './house-detail-posted.component.html',
  styleUrls: ['./house-detail-posted.component.css']
})
export class HouseDetailPostedComponent implements OnInit {

  id: any;
  // @ts-ignore
  houses: House[];
  // @ts-ignore
  newHouses: FormGroup;

// tslint:disable-next-line:max-line-length
  constructor(private activate: ActivatedRoute, private formBuilder: FormBuilder, private authService: AuthService, private  userService: UserService, private  housesService: HouseService) {
  }

  ngOnInit(): void {
    this.activate.params.subscribe((params: Params) => {
      this.id = params.id;
      console.log(this.id);
      console.log(params.id);
      this.housesService.getAllHouses(this.id).subscribe(result => {
        // @ts-ignore
        this.houses = result;
        console.log(this.houses);
      });
    });
  }

// this.activate.params.subscribe((params: Params) => {
//   this.id = params.id;
//   console.log(this.id);
//   this.customerService.getById(this.id).subscribe(result => {
//     this.customer1 = result;
//     console.log(this.customer);
//     // this.customer1 = this.customer;
//   });
// });
}
