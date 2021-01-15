import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
// @ts-ignore
  private user: User;
  constructor() { }

  ngOnInit(): void {
    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}
