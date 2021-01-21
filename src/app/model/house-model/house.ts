import {User} from '../user-model/user';

export interface House {
  houseId?: number;
  houseName?: string;
  type?: number;
  address?: string;
  description?: string;
  price?: number;
  bedroom?: number;
  bathroom?: number;
  status?: number;
  ownerId?: User;
  isDeleted?: boolean;
  avatar?: string;
  avgRate?: number;
}
