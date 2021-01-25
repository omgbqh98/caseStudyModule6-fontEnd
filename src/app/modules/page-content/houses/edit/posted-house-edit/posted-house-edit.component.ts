import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HouseService} from '../../../../../service/house-service/house.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import firebase from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {UserToken} from '../../../../../model/user-model/user-token';
import {AuthService} from '../../../../../service/authen-service/auth.service';
import {UserService} from '../../../../../service/user-service/user.service';
import {User} from '../../../../../model/user-model/user';

@Component({
  selector: 'app-posted-house-edit',
  templateUrl: './posted-house-edit.component.html',
  styleUrls: ['./posted-house-edit.component.css']
})
export class PostedHouseEditComponent implements OnInit {
  // @ts-ignore
  private user: User;
  // @ts-ignore
  currentUser: UserToken;
  // @ts-ignore
  updateForm: FormGroup;
  id: any;
  house: any;
  arrayPicture = '';
  show = '';
  messengerHouseName = '';
  messengerAddress = '';
  messengerDescription = '';
  messengerBathrooms = '';
  messengerBedrooms = '';
  messengerPrice = '';
  messengerType = '';
  submitHouseName = true;
  submitAddress = true;
  submitDescription = true;
  submitBathrooms = true;
  submitBedrooms = true;
  submitPrice = true;
  submitType = true;

  constructor(private houseService: HouseService,
              private storage: AngularFireStorage,
              private ad: AngularFireDatabase,
              private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private userService: UserService) {
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
    this.updateForm = this.fb.group({
      houseName: ['', Validators.required],
      type: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      bedroom: ['', Validators.required],
      bathroom: ['', Validators.required],
      status: ['', Validators.required],
      avatar: ['', Validators.required],
    });

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.houseService.getDetailHouse(this.id).subscribe((result) => {
        this.house = result;
        // this.authService.currentUser.subscribe(value => {
        //   this.currentUser = value;
        //   this.userService.getUserByUsername(value.username).subscribe(value1 => {
        //     this.user = value1;
        //   });
        // });
        this.arrayPicture = this.house.avatar;
        this.updateForm.setValue({
          houseName: this.house.houseName,
          type: this.house.type,
          address: this.house.address,
          description: this.house.description,
          price: this.house.price,
          bedroom: this.house.bedroom,
          bathroom: this.house.bathroom,
          status: this.house.status,
          avatar: this.house.avatar
        });
      });
    });
  }

  // tslint:disable-next-line:typedef
  updateHouse() {
    this.house.houseName = this.updateForm.value.houseName;
    this.house.type = this.updateForm.value.type;
    this.house.address = this.updateForm.value.address;
    this.house.description = this.updateForm.value.description;
    this.house.price = this.updateForm.value.price;
    this.house.bedroom = this.updateForm.value.bedroom;
    this.house.bathroom = this.updateForm.value.bathroom;
    this.house.status = this.updateForm.value.status;
    this.house.bathroom = this.updateForm.value.bathroom;
    this.house.avatar = this.arrayPicture;
    this.houseService.updateHouse(this.house).subscribe(() => {
      this.show = 'Update successfully!';
      // this.router.navigate(['user-ownHouse', this.house.houseId]);
      // window.location.href = '/user-ownHouse/' + this.house.houseId;
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

