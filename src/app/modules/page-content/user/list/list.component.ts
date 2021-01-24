import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../service/user-service/user.service';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../../model/user-model/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listOwners: User[] = [];
  p = 1;
  constructor(private userService: UserService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.userService.findAllOwner().subscribe((data) => {
      this.listOwners = data;
    });
  }
}
