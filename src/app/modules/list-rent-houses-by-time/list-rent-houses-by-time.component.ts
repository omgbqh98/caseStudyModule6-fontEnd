import { Component, OnInit } from '@angular/core';
import {HouseService} from '../../service/house-service/house.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-list-rent-houses-by-time',
  templateUrl: './list-rent-houses-by-time.component.html',
  styleUrls: ['./list-rent-houses-by-time.component.css']
})
export class ListRentHousesByTimeComponent implements OnInit {
  id: any;
  bookingList: any;
  total = 0;
  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.houseService.getBookingByHouse(this.id).subscribe((bookings) => {
          this.bookingList = bookings;
          for (const booking of bookings){
            this.total += booking.total;
          }
        });
      });
  }

}
