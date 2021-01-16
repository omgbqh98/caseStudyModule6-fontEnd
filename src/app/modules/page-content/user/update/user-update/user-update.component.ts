import { Component, OnInit } from '@angular/core';
import {User} from '../../../../../model/user-model/user';
import {UserToken} from '../../../../../model/user-model/user-token';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../../../service/user-service/user.service';
import {AuthService} from '../../../../../service/authen-service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  // @ts-ignore
  user: User;
  // @ts-ignore
  currentUser: UserToken;
  // @ts-ignore
  updateUserForm: FormGroup;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.updateUserForm = this.fb.group({
        id: [''],
        username: [''],
        fullName: [''],
        address: [''],
        phone: [''],
        email: [''],
      });
      this.authService.currentUser.subscribe(value => {
        this.currentUser = value;
        this.userService.getUserByUsername(value.username).subscribe(value1 => {
          this.user = value1;
          this.updateUserForm.setValue({
            id: this.user.userId,
            username: this.user.username,
            fullName: this.user.fullName,
            address: this.user.address,
            phone: this.user.phone,
            email: this.user.email,
          });
        });
      });
  }
  // tslint:disable-next-line:typedef
  updateUser() {
    this.user.userId = this.updateUserForm.value.id;
    this.user.username = this.updateUserForm.value.username;
    this.user.fullName = this.updateUserForm.value.fullName;
    this.user.phone = this.updateUserForm.value.phone;
    this.user.email = this.updateUserForm.value.email;
    this.user.address = this.updateUserForm.value.address;
    this.userService.updateUser(this.user).subscribe(() => {
      alert('Cập nhật User thành công!');
      this.router.navigate(['/user-update', this.currentUser.username]);
    }, error => {
      alert('Lỗi!');
    });
  }

}
