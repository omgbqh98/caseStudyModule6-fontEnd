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
  Img: HousesImg[] = [];
  Imgs: HousesImg[] = [];
   // @ts-ignore
  mess : String;

  // tslint:disable-next-line:max-line-length
  constructor(private activate: ActivatedRoute, private housesImgService: HousesImgService, private formBuilder: FormBuilder, private authService: AuthService, private  userService: UserService, private  housesService: HouseService, private storage: AngularFireStorage) {
    this.activate.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      // @ts-ignore
      this.housesService.getOwnedHouse(this.id).subscribe(result => {
        this.houses = result[0];
        console.log(this.houses);
        console.log(this.houses.houseId);
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
  onFileSelected(event, id) {
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
          console.log('Anh: ');
          console.log(this.downloadURL);
          this.downloadURL.subscribe(async (url) => {
            console.log(this.downloadURL);
            if (url) {
              console.log(url);
              this.fb = url;
            }
            this.Img.push(this.fb);
            // if (Img[0].length == 1) {
            //
            //   this.Img[0] = this.fb;
            //
            // }
            // if (Img[1].length == 1 && Img[0].length == 1) {
            //   this.Img[1] = this.fb;
            // }
            // if(Img[1].length == 1 && Img[0].length == 1){
            //   this.Img.push("1");
            //   this.Img.push(this.fb);
            // }
            // if (Img[1].length == 1 && Img[0].length == null) {
            //   this.Img[0] = "";
            //   this.Img[1] = this.fb;
            // }
            // // if(Img[1] && Img[0])
            // if (Img[2]) {
            //   this.Img[0] = '';
            //   this.Img[1] = '';
            //   Img[2] = this.fb;
            //   this.Img[2] = Img[2];
            //
            // }
            console.log(this.Img);
            if (this.Img.length == 4) {
              console.log(this.Img[0]);
              this.Img[0] = this.Img[3];
              this.Img.splice(2);
            }
            console.log(this.Img);
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

  async createHousesImg() {
    const house = await this.getHouse(this.id);
    console.log(house[0]);
    let houseImgs: HousesImg = {};
    houseImgs.houseId = house[0];
    houseImgs.isAvatar = false;
    for (var i = 1; this.Img.length >= i; i++) {
      houseImgs.link = this.Img[0];
      console.log(houseImgs);
      this.housesImgService.createHouses(houseImgs).subscribe(() => {
        this.mess ="Bạn đã thêm thành công"
        this.Img.splice(0);
      }, error => {
        console.log('Lỗi: ');
        console.log(error);
      });
    }

  }
}
