import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HouseService} from '../../../../../service/house-service/house.service';
import {Router} from '@angular/router';
import {House} from '../../../../../model/house-model/house';
import {UserService} from '../../../../../service/user-service/user.service';
import {AuthService} from '../../../../../service/authen-service/auth.service';
import {User} from '../../../../../model/user-model/user';
import {UserToken} from '../../../../../model/user-model/user-token';
import firebase from 'firebase';

@Component({
  selector: 'app-create-house',
  templateUrl: './create-house.component.html',
  styleUrls: ['./create-house.component.css']
})
export class CreateHouseComponent implements OnInit {
  // @ts-ignore
  createHouseForm: FormGroup;
  user: any;
  // @ts-ignore
  currentUser: UserToken;
  arrayPicture = '';
  constructor(private fb: FormBuilder,
              private houseService: HouseService,
              private router: Router,
              private authService: AuthService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.createHouseForm = this.fb.group({
      houseName: ['', Validators.required],
      type: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      bedroom: ['', Validators.required],
      bathroom: ['', Validators.required],
      status: ['', Validators.required],
      avatar: ['', Validators.required]
    });
  }
  // tslint:disable-next-line:typedef
  createHouse() {
    const house: House = this.createHouseForm.value;
    house.avatar = this.arrayPicture;
    this.authService.currentUser.subscribe(value => {
      this.userService.getUserByUsername(value.username).subscribe(value1 => {
        this.user = value1;
        house.ownerId = this.user;
        this.houseService.create(house).subscribe(() => {
          console.log(house.houseName);
          alert('Create successfully!');
        });
      });
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
