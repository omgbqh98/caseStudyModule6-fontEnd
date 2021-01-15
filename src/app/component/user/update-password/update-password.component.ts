import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserToken} from '../../../model/user-token';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  // @ts-ignore
  private userId: number;
  // @ts-ignore
  private currentUser: User;
  // @ts-ignore
  currentUserToken: UserToken;
  userFullName = '';
  userPhone = '';
  userEmail = '';
  userAddress = '';
  newPasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
  });
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    // @ts-ignore
    this.authService.currentUser.subscribe(
      // @ts-ignore
      currentUser => {
        // @ts-ignore
        this.currentUserToken = currentUser;
      }
    );
  }

  ngOnInit(): void {
    this.getUserProfile();
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
  // tslint:disable-next-line:typedef
  private getUserProfileById(id: string) {
    // @ts-ignore
    this.userService.getUserProfile(id).subscribe(value => {
      this.currentUser = value;
      this.userFullName = value.fullName;
      this.userAddress = value.address;
      this.userPhone = value.phone;
      // this.userPhoneNumber = value.phoneNumber;
      this.userEmail = value.email;
    }, () => {
      console.log('Lỗi!');
    });
  }
  // tslint:disable-next-line:typedef
  changePassword() {
    // @ts-ignore
    const user = this.setNewUser();
    // @ts-ignore
    this.userService.newPassword(user, this.currentUser.id, this.currentUserToken.accessToken).subscribe(() => {
      console.log('Đổi mật khẩu thành công');
      this.newPasswordForm.reset();
      this.router.navigate(['/']);
      // @ts-ignore
    }, err => {
      console.log(user);
      console.log(this.currentUser);
      // @ts-ignore
      console.log(this.currentUserToken);
      console.log(err);
    });
    console.log(user);
  }
  // tslint:disable-next-line:typedef
  private setNewUser() {
    const user: User = {
      username: this.currentUserToken.username,
      password: this.newPasswordForm.value.password,
      // confirmPassword: this.newPasswordForm.value.confirmPassword,
      fullName: this.userFullName,
      // @ts-ignore
      phone: this.userPhone,
      email: this.userEmail,
      address: this.userAddress,
    };
    return user;
  }
}
