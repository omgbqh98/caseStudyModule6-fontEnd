import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserToken} from '../../../../../model/user-model/user-token';
import {User} from '../../../../../model/user-model/user';
import {UserService} from '../../../../../service/user-service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../../service/authen-service/auth.service';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {
  // @ts-ignore
  private userId: number;
  // @ts-ignore
  private user: User;
  // @ts-ignore
  currentUser: UserToken;
  userFullName = '';
  userPhone = '';
  userEmail = '';
  userAddress = '';
  newPasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
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
        this.currentUser = currentUser;
      }
    );
  }

  ngOnInit(): void {
    this.user = {
      fullName: '',
      username: '',
      userId: 1,
      // @ts-ignore
      // confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    };
    this.getUserProfile();
    this.authService.currentUser.subscribe(value => {
      this.currentUser = value;
      this.userService.getUserByUsername(value.username).subscribe(value1 => {
        this.user = value1;
        });
      });
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
      this.user = value;
      console.log(value);
    }, () => {
      console.log('Lỗi!');
    });
  }
  // tslint:disable-next-line:typedef
  changePassword() {
    if (this.newPasswordForm.value.password !== this.newPasswordForm.value.confirmPassword) {
      console.log(this.newPasswordForm.value.password);
      console.log(this.newPasswordForm.value.confirmPassword);
      // console.log(this.password);
      alert('Password and confirm password must match!');
    }
   else if (this.newPasswordForm.valid ){
      // @ts-ignore
      const user = this.setNewUser();
      // @ts-ignore
      this.userService.newPassword(user, this.user.userId).subscribe(() => {
        alert('Đổi mật khẩu thành công');
        this.newPasswordForm.reset();
        // @ts-ignore
        this.router.navigate(['/change-password'], this.user.userId);
        // @ts-ignore
      }, err => {
        console.log(user);
      });
    }  else {
      alert('this.newFormUser.invalid');
    }
  }
  // tslint:disable-next-line:typedef
  private setNewUser() {
    const user: User = {
      username: this.currentUser.username,
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
