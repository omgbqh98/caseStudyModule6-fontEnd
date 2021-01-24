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
  sum = 0;
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
  sumRate = 0;
  avgRate = 0;
  p = 1;

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
      this.ratingService.getParentRatingsByHouse(this.id).subscribe((ratings) => {
        if (typeof ratings === undefined){
          this.sum = 0;
        }
        this.listParentRating = ratings;
        this.sum = this.listParentRating.length;
        console.log('tổng bình luận' + this.sum);
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
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    // @ts-ignore
    this.userService.getUserProfile(this.currentUser.username).subscribe(value => this.user = value);
  }

  // tslint:disable-next-line:typedef
  replyBtnClicked(ratingId: number) {
    this.parentRatingTag = ratingId;
    this.ratingService.getCheckedOutUserByHouse(this.id).subscribe((users) => {
      this.checkedOutList = users;
      console.log('danh sách thằng checkout:' + this.checkedOutList);
      this.owner = this.currentHouse.ownerId;
      const contains = this.checkedOutList.some(elem => {
        return JSON.stringify(this.user) === JSON.stringify(elem);
      });
      if (this.user == null) {
        this.isShowAlert = true;
      } else if (contains || this.owner.userId === this.user.userId) {
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
    console.log('feedback' + feedback);
    this.ratingService.createNewComment(feedback).subscribe(value => {
      console.log('kết quả thêm comment' + value);
      this.isShow = false;
      this.ratingService.getChildRatingByHouse(this.id).subscribe((data) => {
        console.log('thành công');
        this.listChildRating = data;
      });
    });
  }
}
