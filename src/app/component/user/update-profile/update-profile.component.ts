import { Component, OnInit } from '@angular/core';
import {IUser} from '../../../iuser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
 // @ts-ignore
  private userId: number;
  // @ts-ignore
  private user: IUser;
  // @ts-ignore
  newFormUpdate: FormGroup;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.newFormUpdate = this.fb.group({
      fullName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
    this.activatedRouter.params.subscribe(params => {
      this.userId = params.id;
      this.userService.finById(this.userId).subscribe(res => {
        this.user = res;
        this.newFormUpdate.setValue({
          fullName: res.fullName,
          phone: res.phone,
          address: res.address,
          email: res.email
        });
      });
    });
  }

  // tslint:disable-next-line:typedef
  update() {
    if (!this.newFormUpdate.invalid) {
      this.user.fullName = this.newFormUpdate.value.fullName;
      this.user.phone = this.newFormUpdate.value.phone;
      this.user.address = this.newFormUpdate.value.address;
      this.user.email = this.newFormUpdate.value.email;
      console.log(this.user);
      this.userService.updateProfile(this.user).toPromise().then(value => {
        console.log('update', value);
        alert('update ok');
      });
      this.router.navigate(['']);
    }
  }

}

