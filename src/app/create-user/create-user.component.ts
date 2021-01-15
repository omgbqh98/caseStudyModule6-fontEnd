import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserServiceService} from '../../../../tungtung/src/app/service/user-service.service';
import {MustMatch} from './MustMatch';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  // @ts-ignore
  newFromUser: FormGroup;
  submitted = false;
  // @ts-ignore
  newFromLogin: FormGroup;
  // @ts-ignore
  newUser: FormGroup;

  constructor(private userService: UserServiceService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.newFromUser = this.formBuilder.group({
      address: ['', Validators.required],
      avatar: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required]],
      password: ['', Validators.required, Validators.minLength(6)],
      phone: ['', Validators.required],
      username: ['', Validators.required],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
    this.newFromLogin = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  // tslint:disable-next-line:typedef
  get f() { // @ts-ignore
    return this.newFromUser.controls;
  }

// tslint:disable-next-line:typedef
  createNewUser() {
    this.submitted = true;
    if (this.newFromUser.invalid) {
      let newUserName: User;
      newUserName = this.newFromUser.value;
      this.userService.createCustomer(newUserName).subscribe(() => {
        }
      );
    }
  }



  // tslint:disable-next-line:typedef
  login() {
    // tslint:disable-next-line:prefer-const
    let loginUser: User;
    loginUser = this.newFromLogin.value;
    this.userService.loginUser(loginUser).subscribe(() => {
      alert('login thành công');
    }, error => {
      alert(console.log(this.userService.createCustomer(loginUser).subscribe()));
    });
  }
}
