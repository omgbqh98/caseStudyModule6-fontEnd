import {Component, OnInit, NgZone} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserToken} from '../../../model/user-model/user-token';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../service/authen-service/auth.service';
import {User} from '../../../model/user-model/user';
import {first} from 'rxjs/operators';
import {UserService} from '../../../service/user-service/user.service';
import {GoogleToken} from '../../../model/googleToken-model/GoogleToken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  showModal: true;
  // @ts-ignore
  user: User;
  // @ts-ignore
  newFormUser: FormGroup;
  // @ts-ignore
  newFormLogin: FormGroup;
  // @ts-ignore
  currentUser: UserToken;
  submitted = false;
  returnUrl = '';
  // @ts-ignore
  message: string;
  show = '';
  password = '';
  submitPassword = false;
  submitConfirmPassword = false;
  submitPhone = false;
  submitUserName = false;
  messengerPassword = '';
  messengerConfirmPassword = '';
  messengerPhone = '';
  messengerUserName = '';
  isVNPhoneMobile = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private ngZone: NgZone,
              private formBuilder: FormBuilder,
              private userService: UserService) {
    // @ts-ignore
    this.authService.currentUser.subscribe(value => this.currentUser = value);
    // @ts-ignore
    window['onSignIn'] = (user: any) => ngZone.run(() => this.onSignIn(user));
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.newFormUser = this.formBuilder.group({
      password: ['', Validators.required],
      phone: ['', Validators.required],
      username: ['', Validators.required],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.newFormLogin = this.formBuilder.group({
      username: [''],
      password: ['']
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
  }

  // tslint:disable-next-line:typedef
  login() {
    // tslint:disable-next-line:prefer-const
    let loginUser: User;
    loginUser = this.newFormLogin.value;
    console.log('loginuser' + this);
    this.authService.login(loginUser)
      .pipe(first())
      .subscribe(data => {
          console.log('thành công');
          this.router.navigate(['']); // navigate sau khi login
          window.location.href = '';
        }, error => {
          this.message = 'Incorrect username or password';
        }
      );
  }

  // tslint:disable-next-line:typedef
  get f() { // @ts-ignore
    return this.newFromUser.controls;
  }

  // tslint:disable-next-line:typedef
  createNewUser() {
    // tslint:disable-next-line:triple-equals
    if (this.newFormUser.value.password != this.newFormUser.value.confirmPassword) {
      alert('Password and confirm password must match!');
    }
      // this.submitted = true;
    // stop here if form is invalid
    else if (this.newFormUser.valid) {
      let newUserName: User;
      console.log(this.newFormUser);
      console.log(this.newFormUser.value);
      newUserName = this.newFormUser.value;
      console.log(this.newFormUser);
      console.log(newUserName.username);
      this.authService.signup(newUserName).subscribe(() => {
          window.location.href = '/login';
        }, error => {
          // @ts-ignore
          this.showModal = false;
          this.messengerUserName = '*Username already exists!';
          this.submitUserName = false;
          this.showModal = true;
        }
      );

    } else {
      alert('this.newFormUser.invalid');
    }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.newFormUser.value));
  }

  // tslint:disable-next-line:typedef
  onSignIn(googleUser: any) {
    console.log('Login thành công');
    const id_token = googleUser.getAuthResponse().id_token;
    const googleToken = new GoogleToken();
    googleToken.token = id_token;
    this.authService.googleSignIn(googleToken);
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  checkPassword(input) {
    console.log(input.target.value);
    this.password = input.target.value;
    // @ts-ignore
    if ((input.target.value.length < 6 || input.target.value.length > 8) && (
      input.target.value.length >= 1)) {
      this.messengerPassword = '*Password must be between 6 and 8 characters!';
      this.submitPassword = false;
    } else if (input.target.value.length < 1) {
      this.messengerPassword = '*Please enter your password!';
      this.submitPassword = false;
    } else {
      this.messengerPassword = '';
      this.submitPassword = true;
      this.submitConfirmPassword = false;
    }

  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  checkConfirmPassword(input2) {
    console.log(input2.target.value);
    // @ts-ignore
    if (((input2.target.value === this.password)) && (
      input2.target.value.length >= 1)) {
      this.messengerConfirmPassword = '';
      this.submitConfirmPassword = true;
    } else if (input2.target.value.length < 1) {
      this.messengerConfirmPassword = '*Please enter your password!';
      this.submitConfirmPassword = false;
    } else {
      this.messengerConfirmPassword = '*Password and confirm password must match!';
      this.submitConfirmPassword = false;
    }
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  checkPhone(inputPhone) {
    console.log(inputPhone.target.value);
    if ((this.isVNPhoneMobile.test(inputPhone.target.value) === false) && (
      inputPhone.target.value.length >= 1)) {
      this.messengerPhone = '*Not valid phone number!';
      this.submitPhone = false;
    } else if (inputPhone.target.value.length < 1) {
      this.messengerPhone = '*Please enter your phone number!';
      this.submitPhone = false;
    } else {
      this.messengerPhone = '';
      this.submitPhone = true;
    }
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  checkUserName(inputUserName) {
    console.log(inputUserName.target.value);
    if ((inputUserName.target.value.length < 4 || inputUserName.target.value.length > 12) && (
      inputUserName.target.value.length >= 1)) {
      this.messengerUserName = '*User name must be between 4 and 12 characters!';
      this.submitUserName = false;
    } else if (inputUserName.target.value.length < 1) {
      this.messengerUserName = '*Please enter your user name!';
      this.submitUserName = false;
    } else {
      this.messengerUserName = '';
      this.submitUserName = true;
    }
  }

  submit(): boolean {
    if (this.submitPassword && this.submitConfirmPassword && this.submitPhone && this.submitUserName) {
      return true;
    }
    return false;
  }

}
