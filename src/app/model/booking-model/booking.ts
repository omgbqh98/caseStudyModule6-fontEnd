import {House} from '../house-model/house';
import {User} from '../user-model/user';
import {Timestamp} from 'rxjs';

export interface Booking {
  bookingId?: number;
  houseId?: House;
  userId?: User;
  checkIn?: any;
  checkOut?: any;
  total?: number;
  createdAt?: Timestamp<any>;
  status?: any;
  isRated?: boolean;
}
