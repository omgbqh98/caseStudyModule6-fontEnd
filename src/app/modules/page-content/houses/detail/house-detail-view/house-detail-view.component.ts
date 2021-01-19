import { Component, OnInit } from '@angular/core';
import {House} from '../../../../../model/house-model/house';
import {HouseService} from '../../../../../service/house-service/house.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {User} from '../../../../../model/user-model/user';

@Component({
  selector: 'app-house-detail-view',
  templateUrl: './house-detail-view.component.html',
  styleUrls: ['./house-detail-view.component.css']
})
export class HouseDetailViewComponent implements OnInit {
  house: any;
  id: any;
  listParentRating: any;
  listChildRating: any;
  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.houseService.getDetailHouse(this.id).subscribe((result) => {
        this.house = result;
      });
      this.houseService.getParentRatingByHouse(this.id).subscribe((ratings) => {
        this.listParentRating = ratings;
      });
      this.houseService.getChildRatingByHouse(this.id).subscribe((data) => {
        console.log('thành công');
        this.listChildRating = data;
      });
    });
  }
}
