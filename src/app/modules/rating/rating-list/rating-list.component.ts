import { Component, OnInit } from '@angular/core';
import {HouseService} from '../../../service/house-service/house.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RatingService} from '../../../service/rating-service/rating.service';

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
  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute,
              private ratingService: RatingService) {}

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
}
