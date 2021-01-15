import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserToken} from '../../model-user/user-token';
import {User} from '../../model-user/user';
import {UserService} from '../../user-service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../../authen-service/auth.service';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {
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
    private activatedRouter: ActivatedRoute,
    private authService: AuthService
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
    this.currentUser = {
      fullName: '',
      username: '',
      userId: 1
    };
    this.getUserProfile();
  }
  // tslint:disable-next-line:typedef
  getUserProfile() {
    // @ts-ignore
    this.sub = this.activatedRouter.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      console.log(id);
      // @ts-ignore
      this.getUserProfileById(id);
    });
  }
  // tslint:disable-next-line:typedef
  private getUserProfileById(id: string) {
    // @ts-ignore
    this.userService.getUserProfileById(id).subscribe(value => {
      this.currentUser = value;
      console.log(value);
    }, () => {
      console.log('Lỗi!');
    });
  }
  // tslint:disable-next-line:typedef
  changePassword() {
    // @ts-ignore
    const user = this.setNewUser();
    // @ts-ignore
    this.userService.newPassword(user, this.currentUser.userId).subscribe(() => {
      alert('Đổi mật khẩu thành công');
      this.newPasswordForm.reset();
      this.router.navigate(['/']);
      // @ts-ignore
    }, err => {
      console.log(user);
    });
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
