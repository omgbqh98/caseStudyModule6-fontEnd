import { Component, OnInit } from '@angular/core';
import {User} from '../../../../../model/user-model/user';
import {UserToken} from '../../../../../model/user-model/user-token';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../../../service/user-service/user.service';
import {AuthService} from '../../../../../service/authen-service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/database';
import firebase from 'firebase';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  // title = "cloudsSorage";
  // @ts-ignore
  selectedFile: File = null;
  // @ts-ignore
  fb;
  // @ts-ignore
  user: User;
  // @ts-ignore
  currentUser: UserToken;
  // @ts-ignore
  updateUserForm: FormGroup;
  arrayPicture = '';
  constructor(
    private storage: AngularFireStorage,
    private userService: UserService,
    private authService: AuthService,
    private ad: AngularFireDatabase,
    // @ts-ignore
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
      this.updateUserForm = this.fb.group({
        id: [''],
        username: [''],
        fullName: [''],
        address: [''],
        phone: [''],
        email: [''],
        avatar: ['']
      });
      this.authService.currentUser.subscribe(value => {
        this.currentUser = value;
        this.userService.getUserByUsername(value.username).subscribe(value1 => {
          this.user = value1;
          this.arrayPicture = this.user.avatar;
          console.log(this.user.username);
          this.updateUserForm.setValue({
            id: this.user.userId,
            username: this.user.username,
            fullName: this.user.fullName,
            address: this.user.address,
            phone: this.user.phone,
            email: this.user.email,
            avatar: this.user.avatar
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
      // this.user.avatar = this.updateUserForm.value.avatar;
      this.user.avatar = this.arrayPicture;
      this.userService.updateUser(this.user).subscribe(() => {
        alert('Cập nhật User thành công!');
        this.router.navigate(['/user-update', this.currentUser.username]);
        window.location.href = '/user-update/' + this.currentUser.username;
      }, error => {
        alert('Lỗi!');
      });
  }
  // @ts-ignore
  // tslint:disable-next-line:typedef
  saveImg(value) {
    const file = value.target.files;
    const metadata = {
      contentType: 'image/jpeg',
    };
    const uploadTask = firebase.storage().ref('img/' + Date.now()).put(file[0], metadata);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
      },
      () => {
        console.log('Error');
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.arrayPicture = downloadURL;
          console.log(downloadURL);
        });
      }
    );
  }
}

