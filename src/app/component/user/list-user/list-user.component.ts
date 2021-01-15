import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/user';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  // @ts-ignore
  listUser: User[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUser();
  }
  // @ts-ignore
  getAllUser(): User[]{
    this.userService.getAllUser().subscribe((data) => {
      this.listUser = data;
      console.log(this.listUser);
      return this.listUser;
    });
  }
}
