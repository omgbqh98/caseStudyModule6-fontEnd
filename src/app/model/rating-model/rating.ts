import {User} from '../user-model/user';
import {House} from '../house-model/house';
import {Timestamp} from 'rxjs';
import {Booking} from '../booking-model/booking';

export interface Rating {
  ratingId?: number;
  userId?: User;
  houseId?: House;
  rate?: number;
  review?: string;
  parentId?: Rating;
  createdAt?: Timestamp<any>;
  bookingId?: Booking;
}

