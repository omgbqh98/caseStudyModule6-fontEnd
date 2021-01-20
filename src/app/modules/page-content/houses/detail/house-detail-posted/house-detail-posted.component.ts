import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HouseService} from '../../../../../service/house-service/house.service';
// import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-house-detail-posted',
  templateUrl: './house-detail-posted.component.html',
  styleUrls: ['./house-detail-posted.component.css']
})
export class HouseDetailPostedComponent implements OnInit {
  house: any;
  id: any;
  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.houseService.getDetailHouse(this.id).subscribe((result) => {
        this.house = result;
      });
    });
  }

  // tslint:disable-next-line:typedef
  upgrade(id: number) {
    this.houseService.upgrade(id).subscribe();
    // alert('doi thanh cong');
    this.houseService.getDetailHouse(this.id);
    window.location.href = '/user-ownHouse/' + this.house.houseId;
  }

  // tslint:disable-next-line:typedef
  hired(id: number) {
    this.houseService.hired(id).subscribe();
    // alert('hired thanh cong');
    window.location.href = '/user-ownHouse/' + this.house.houseId;
    }
  // tslint:disable-next-line:typedef
  checkedIn(id: number) {
    this.houseService.checkedIn(id).subscribe();
    // alert('checkedIn thanh cong');
    window.location.href = '/user-ownHouse/' + this.house.houseId;
  }

  // tslint:disable-next-line:typedef
  empty(id: number){
    this.houseService.empty(id).subscribe();
    window.location.href = '/user-ownHouse/' + this.house.houseId;
  }
  // tslint:disable-next-line:typedef
  // empty(id: number) {
  //   this.houseService.empty(id).subscribe(() => {
  //     // alert('ampty thanh cong');
  //     window.location.href = '/user-ownHouse/' + this.house.houseId;
  //     // tslint:disable-next-line:no-shadowed-variable
  //   }, error => {
  //     alert('da co ng thue');
  //   });
  // }
}
