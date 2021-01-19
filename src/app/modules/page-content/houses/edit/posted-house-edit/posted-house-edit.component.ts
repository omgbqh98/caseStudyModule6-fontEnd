import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HouseService} from '../../../../../service/house-service/house.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import firebase from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-posted-house-edit',
  templateUrl: './posted-house-edit.component.html',
  styleUrls: ['./posted-house-edit.component.css']
})
export class PostedHouseEditComponent implements OnInit {
  // @ts-ignore
  updateForm: FormGroup;
  id: any;
  house: any;
  arrayPicture = '';
  constructor(private houseService: HouseService,
              private storage: AngularFireStorage,
              private ad: AngularFireDatabase,
              private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }
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
      alert('Cập nhật User thành công!');
      this.router.navigate(['user-ownHouse', this.house.houseId]);
      window.location.href = '/user-ownHouse/' + this.house.houseId;
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
