import {Component, OnInit} from '@angular/core';
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
  valueType = '-1';
  show = '';
  arrayPicture = '';
  messengerHouseName = '';
  messengerAddress = '';
  messengerDescription = '';
  messengerBathrooms = '';
  messengerBedrooms = '';
  messengerPrice = '';
  messengerType = '';
  submitHouseName = false;
  submitAddress = false;
  submitDescription = false;
  submitBathrooms = false;
  submitBedrooms = false;
  submitPrice = false;
  submitType = false;

  constructor(private fb: FormBuilder,
              private houseService: HouseService,
              private router: Router,
              private authService: AuthService,
              private userService: UserService) {
  }

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
          this.show = 'Create successfully!';
          // @ts-ignore
          this.createHouseForm.reset();
          this.submitHouseName = false;
          this.submitAddress = false;
          this.submitDescription = false;
          this.submitBathrooms = false;
          this.submitBedrooms = false;
          this.submitPrice = false;
          this.submitType = false;
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

  // @ts-ignore
  // tslint:disable-next-line:typedef
  checkHouseName(input) {
    console.log(input.target.value);
    // @ts-ignore
    if ((input.target.value.length > 20)) {
      this.messengerHouseName = '*House name less than 20 characters!';
      this.submitHouseName = false;
    } else if (input.target.value.length < 1) {
      this.messengerHouseName = '*House name is required!';
      this.submitHouseName = false;
    } else {
      this.messengerHouseName = '';
      this.submitHouseName = true;
    }
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  checkAddress(inputAddress) {
    // @ts-ignore
    if ((inputAddress.target.value.length > 30)) {
      this.messengerAddress = '*The address less than 30 characters!';
      this.submitAddress = false;
    } else if (inputAddress.target.value.length < 1) {
      this.messengerAddress = '*The address is required!';
      this.submitAddress = false;
    } else {
      this.messengerAddress = '';
      this.submitAddress = true;
    }
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  checkDescription(inputDescription) {
    // @ts-ignore
    if ((inputDescription.target.value.length > 40)) {
      this.messengerDescription = '*Description less than 40 characters!';
      this.submitDescription = false;
    } else if (inputDescription.target.value.length < 1) {
      this.messengerDescription = '*Description is required!';
      this.submitDescription = false;
    } else {
      this.messengerDescription = '';
      this.submitDescription = true;
    }
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  checkBedroom(inputBedroom) {
    // @ts-ignore
    if ((inputBedroom.target.value < 0)) {
      this.messengerBedrooms = '*Invalid!';
      this.submitBedrooms = false;
    } else if (inputBedroom.target.value.length < 1) {
      this.messengerBedrooms = '*Bedroom is required!';
      this.submitBedrooms = false;
    } else {
      this.messengerBedrooms = '';
      this.submitBedrooms = true;
    }
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  checkBathroom(inputBathroom) {
    // @ts-ignore
    if ((inputBathroom.target.value < 0)) {
      this.messengerBathrooms = '*Invalid!';
      this.submitBathrooms = false;
    } else if (inputBathroom.target.value.length < 1) {
      this.messengerBathrooms = '*Bathroom is required!';
      this.submitBathrooms = false;
    } else {
      this.messengerBathrooms = '';
      this.submitBathrooms = true;
    }
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  checkPrice(inputPrice) {
    // @ts-ignore
    if ((inputPrice.target.value < 0)) {
      this.messengerPrice = '*Invalid!';
      this.submitPrice = false;
    } else if (inputPrice.target.value.length < 1) {
      this.messengerPrice = '*Price is required!';
      this.submitPrice = false;
    } else {
      this.messengerPrice = '';
      this.submitPrice = true;
    }
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  checkType(inputType) {
    // @ts-ignore
    if (inputType.target.value === '') {
      this.messengerType = '*Type is required!';
      this.submitType = false;
    } else {
      this.messengerType = '';
      this.submitType = true;
    }
  }

  submit(): boolean {
    if (this.submitHouseName && this.submitAddress && this.submit && this.submitDescription
      && this.submitBedrooms && this.submitBathrooms && this.submitPrice && this.submitType) {
      return true;
    }
    return false;
  }
}
