import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  // @ts-ignore
  private user: string;
  // @ts-ignore
  private currentUser: User;
  // @ts-ignore
  newFormUpdate: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }
  ngOnInit(): void {
    // this.newFormUpdate = this.fb.group({
    //   fullName: ['', [Validators.required]],
    //   email: ['', [Validators.required]],
    //   phone: ['', [Validators.required]],
    //   address: ['', [Validators.required]],
    // });
    // this.activatedRouter.params.subscribe(params => {
    //   this.userService.(this.id).subscribe(res => {
    //     this.user = res;
    //     this.newFormUpdate.setValue({
    //       title: res.title,
    //       author: res.author,
    //       description: res.author
    //     });
    //   });
    // });
  }
  // tslint:disable-next-line:typedef
  getUserProfile() {
    // @ts-ignore
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      // @ts-ignore
      this.getUserProfileById(id);
    });
  }

}

