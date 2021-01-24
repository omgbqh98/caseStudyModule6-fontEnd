import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../../service/user-service/user.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-user-show-for-all',
  templateUrl: './user-show-for-all.component.html',
  styleUrls: ['./user-show-for-all.component.css']
})
export class UserShowForAllComponent implements OnInit {
  user: any;
  id: any;
  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.userService.finById(this.id).subscribe((result) => {
        this.user = result;
      });
    });
  }
}


