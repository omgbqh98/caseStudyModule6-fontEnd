import {Component, OnInit} from '@angular/core';
import {House} from '../../../../../model/house-model/house';
import {HouseService} from '../../../../../service/house-service/house.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {User} from '../../../../../model/user-model/user';
import {HousesImgService} from '../../../../../service/house-service/houses-img.service';
import {HousesImg} from '../../../../../model/house-model/housesImg';

@Component({
  selector: 'app-house-detail-view',
  templateUrl: './house-detail-view.component.html',
  styleUrls: ['./house-detail-view.component.css']
})
export class HouseDetailViewComponent implements OnInit {
  house: any;
  // @ts-ignore
  id: number;
  // @ts-ignore
  houseImg: any = [];

  constructor(private houseService: HouseService,
              private houseImgService: HousesImgService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = paramMap.get('id');
      console.log(this.id);
      this.houseService.getDetailHouse(this.id).subscribe(result => {
        this.house = result;

        console.log(this.house);
      });
      this.houseService.getAllHouseImg(this.id).subscribe(list => {

        this.houseImg = list;
        console.log(this.houseImg);
      });
    });
  }
}
