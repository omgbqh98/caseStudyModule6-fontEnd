import { Component, OnInit } from '@angular/core';
import {HouseService} from '../../../service/house-service/house.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

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
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.houseService.getParentRatingByHouse(this.id).subscribe((ratings) => {
        this.listParentRating = ratings;
        this.sum = this.listParentRating.length;
      });
      this.houseService.getChildRatingByHouse(this.id).subscribe((data) => {
        console.log('thành công');
        this.listChildRating = data;
      });
    });
  }
}
