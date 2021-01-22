import { Component, OnInit } from '@angular/core';
import {HouseService} from '../../../../../service/house-service/house.service';
import {House} from '../../../../../model/house-model/house';

@Component({
  selector: 'app-list-all-houses',
  templateUrl: './list-all-houses.component.html',
  styleUrls: ['./list-all-houses.component.css'],
})
export class ListAllHousesComponent implements OnInit {
  p = 1;
  listHouses: House[] = [];
  constructor(private houseService: HouseService) {
  }

  ngOnInit(): void {
    this.getAllHouses();
  }
  getAllHouses(): House[] {
    this.houseService.getAllHouse().subscribe((result) => {
      this.listHouses = result;
    });
    return this.listHouses;
  }
}
