import {Component, OnInit} from '@angular/core';
import {House} from '../../model/house-model/house';
import {HouseService} from '../../service/house-service/house.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  listHousesSearch: House[] = [];
  p = 1;

  constructor(private houseService: HouseService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.houseService.currentMessage.subscribe(message => this.listHousesSearch = message);
  }
}
