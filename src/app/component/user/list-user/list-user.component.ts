import { Component, OnInit } from '@angular/core';
import {IUser} from '../../../iuser';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  // @ts-ignore
  listUser: IUser[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUser();
  }
  // @ts-ignore
  getAllUser(): IUser[]{
    this.userService.getAllUser().subscribe((data) => {
      this.listUser = data;
      console.log(this.listUser);
      return this.listUser;
    });
  }
}
