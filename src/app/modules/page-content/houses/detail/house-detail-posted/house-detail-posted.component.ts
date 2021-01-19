import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {HouseService} from '../../../../../service/house-service/house.service';

@Component({
  selector: 'app-house-detail-posted',
  templateUrl: './house-detail-posted.component.html',
  styleUrls: ['./house-detail-posted.component.css']
})
export class HouseDetailPostedComponent implements OnInit {
  house: any;
  id: any;
  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');      console.log(this.id);
      this.houseService.getDetailHouse(this.id).subscribe((result) => {
        this.house = result;
      });
    });
  }

}
