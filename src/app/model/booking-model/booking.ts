import {House} from '../house-model/house';
import {User} from '../user-model/user';
import {Timestamp} from 'rxjs';

export interface Booking {
  bookingId?: number;
  houseId?: House;
  userId?: User;
  checkIn?: Date;
  checkOut?: Date;
  total?: number;
  createdAt?: Timestamp<any>;
}
