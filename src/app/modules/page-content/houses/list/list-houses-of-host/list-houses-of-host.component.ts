import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {HouseService} from '../../../../../service/house-service/house.service';

@Component({
  selector: 'app-list-houses-of-host',
  templateUrl: './list-houses-of-host.component.html',
  styleUrls: ['./list-houses-of-host.component.css']
})
export class ListHousesOfHostComponent implements OnInit {
  id: any;
  listHouse: any;
  p = 1;
  constructor(private activatedRoute: ActivatedRoute,
              private houseService: HouseService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = paramMap.get('id');
      this.houseService.getOwnedHouse(this.id).subscribe((data) => {
        this.listHouse = data;
      });
    });
  }

}
