import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../../../../service/authen-service/auth.service';
import {UserService} from '../../../../../service/user-service/user.service';
import {HouseService} from '../../../../../service/house-service/house.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {House} from '../../../../../model/house-model/house';

import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HousesImg} from '../../../../../model/house-model/housesImg';
import {HousesImgService} from '../../../../../service/house-service/houses-img.service';
import {ActivatedRoute, ParamMap} from '@angular/router';


@Component({
  selector: 'app-create-houses-img',
  templateUrl: './create-houses-img.component.html',
  styleUrls: ['./create-houses-img.component.css']
})
export class CreateHousesImgComponent implements OnInit {
  id: any;
  // @ts-ignore
  houses: House;
  // @ts-ignore
  housesImg: HousesImg;
  // @ts-ignore
  newFromHouses: FromGroup;
  // @ts-ignore
  fb;
  // @ts-ignore
  selectedFile: File = null;
  // @ts-ignore
  downloadURL: Observable<string>;

  // tslint:disable-next-line:max-line-length
  constructor(private activate: ActivatedRoute, private housesImgService: HousesImgService, private formBuilder: FormBuilder, private authService: AuthService, private  userService: UserService, private  housesService: HouseService, private storage: AngularFireStorage) {
    this.activate.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      // @ts-ignore
      this.housesService.getOwnedHouse(this.id).subscribe(result => {
        this.houses = result;
        console.log(this.houses);
        console.log(this.houses.houseId);
        // this.newFromHouses.patchValue({});
      });
    });
  }

  ngOnInit(): void {

  }


  // @ts-ignore
  getHouse(id) {
    return this.housesService.getOwnedHouse(id).toPromise();
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  onFileSelected(event,id) {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          console.log(this.downloadURL);
          this.downloadURL.subscribe(async (url) => {
            console.log(this.downloadURL);
            if (url) {
              console.log(url);
              this.fb = url;
              const house =  await this.getHouse(id);
              let houseImgs: HousesImg = {};
              houseImgs.houseId = house;
              houseImgs.isAvatar = false;
              houseImgs.link = url;
              this.housesImgService.createHouses(houseImgs).subscribe(() =>{
                alert("oke")
              });
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
        }
      });
  }
}
