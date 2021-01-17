import { Component, OnInit } from '@angular/core';
import {HouseService} from '../../../../../service/house-service/house.service';
import {House} from '../../../../../model/house-model/house';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-list-own-houses',
  templateUrl: './list-own-houses.component.html',
  styleUrls: ['./list-own-houses.component.css']
})
export class ListOwnHousesComponent implements OnInit {
  listHouses: House[] = [];
  id: any;
  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.houseService.getOwnedHouse(this.id).subscribe((result) => {
        this.listHouses = result;
      });
    });
  }
}
