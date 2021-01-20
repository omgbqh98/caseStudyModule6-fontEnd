import { Component, OnInit } from '@angular/core';
import {HouseService} from '../../../service/house-service/house.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RatingService} from '../../../service/rating-service/rating.service';
import {AuthService} from '../../../service/authen-service/auth.service';
import {UserToken} from '../../../model/user-model/user-token';
import {User} from '../../../model/user-model/user';
import {UserService} from '../../../service/user-service/user.service';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.css']
})
export class RatingListComponent implements OnInit {
  // house: any;
  id: any;
  listParentRating: any;
  listChildRating: any;
  sum: any;
  currentUser: any;
  user: any;
  checkedOutList: Array<User> = [];
  isShow = false;
  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute,
              private ratingService: RatingService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.ratingService.getParentRatingByHouse(this.id).subscribe((ratings) => {
        this.listParentRating = ratings;
        this.sum = this.listParentRating.length;
      });
      this.ratingService.getChildRatingByHouse(this.id).subscribe((data) => {
        console.log('thành công');
        this.listChildRating = data;
      });
    });
  }
  // tslint:disable-next-line:typedef
  getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    // @ts-ignore
    console.log(this.currentUser);
    // @ts-ignore
    this.userService.getUserProfile(this.currentUser.username).subscribe(value => this.user = value);
  }

  // tslint:disable-next-line:typedef
  replyBtnClicked() {
    this.ratingService.getCheckedOutUserByHouse(this.id).subscribe((users) => {
      this.getCurrentUser();
      this.checkedOutList = users;
      if (this.checkedOutList.includes(this.user)) {
        this.isShow = true;
      }
    });
  }
}
