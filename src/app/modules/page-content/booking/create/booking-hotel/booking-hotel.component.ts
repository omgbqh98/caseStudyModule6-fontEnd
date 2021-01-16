import {Component, OnInit, ViewChild} from '@angular/core';
import {MbscInput} from '@mobiscroll/angular';
import {Booking} from '../../../../../model/booking-model/booking';
import {Datepicker} from '@mobiscroll/angular';

const now = new Date();


interface HiParams {
  start: MbscInput;
}

@Component({
  selector: 'app-booking-hotel',
  templateUrl: './booking-hotel.component.html',
  styleUrls: ['./booking-hotel.component.css']
})
export class BookingHotelComponent implements OnInit {
  private startInput: string | undefined;
  private endInput!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  // @ts-ignore
  @ViewChild('calInst')

  inst: Datepicker;
  min = now;
  max = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());


  hi(start: MbscInput) {
    console.log(start);

  }
}
