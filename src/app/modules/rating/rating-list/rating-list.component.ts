import {Component, OnInit} from '@angular/core';
import {HouseService} from '../../../service/house-service/house.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RatingService} from '../../../service/rating-service/rating.service';
import {AuthService} from '../../../service/authen-service/auth.service';
import {UserToken} from '../../../model/user-model/user-token';
import {User} from '../../../model/user-model/user';
import {UserService} from '../../../service/user-service/user.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {House} from '../../../model/house-model/house';
import {Rating} from '../../../model/rating-model/rating';
import {Timestamp} from 'rxjs';

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
  isShowAlert = false;
  currentHouse: any;
  owner: any;
  parentRatingTag: any;
  // @ts-ignore
  createNewCommentForm: FormGroup;

  // newComment: Rating;

  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute,
              private ratingService: RatingService,
              private userService: UserService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.houseService.getDetailHouse(this.id).subscribe((house) => {
        this.currentHouse = house;
      });
      this.ratingService.getParentRatingByHouse(this.id).subscribe((ratings) => {
        this.listParentRating = ratings;
        this.sum = this.listParentRating.length;
      });
      this.ratingService.getChildRatingByHouse(this.id).subscribe((data) => {
        console.log('thành công');
        this.listChildRating = data;
      });
    });
    this.createNewCommentForm = this.fb.group({
      userId: [''],
      houseId: [''],
      rate: [''],
      review: [''],
      parentId: [''],
    });
  }

  // tslint:disable-next-line:typedef
  getCurrentUser() {
    // @ts-ignore
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    // @ts-ignore
    this.userService.getUserProfile(this.currentUser.username).subscribe(value => this.user = value);
  }

  // tslint:disable-next-line:typedef
  replyBtnClicked(ratingId: number) {
    this.parentRatingTag = ratingId;
    this.ratingService.getCheckedOutUserByHouse(this.id).subscribe((users) => {
      this.checkedOutList = users;
      console.log('danh sách thằng checkout:' + this.checkedOutList);
      // this.getCurrentUser(); // lấy thằng user hiện tại vào biến user
      this.owner = this.currentHouse.ownerId;
      // console.log('Thông tin nhà hiện tại:' + this.currentHouse);
      // console.log('thằng chủ' + this.owner);
      if (this.checkedOutList.includes(this.user) || this.owner.userId === this.user.userId) {
        console.log('kết quả check là checkout hoặc chủ');
        this.isShow = true;
      } else {
        this.isShowAlert = true;
      }
    });
  }

  // tslint:disable-next-line:typedef
  hideCommentBox() {
    this.isShow = false;
  }

  // tslint:disable-next-line:typedef
  createComment(parent: number) {
    const feedback = this.createNewCommentForm.value;
    feedback.userId = this.user;
    feedback.houseId = this.currentHouse;
    feedback.rate = 0;
    feedback.review = this.createNewCommentForm.value.review;
    feedback.parentId = parent;
    this.ratingService.createNewRating(feedback).subscribe(value => {
      alert('Create successfully!');
      console.log('kết quả thêm comment' + value);
      this.isShow = false;
    });
  }
}
