import {AuthService} from '../../../../../service/authen-service/auth.service';
import {UserService} from '../../../../../service/user-service/user.service';
import {HouseService} from '../../../../../service/house-service/house.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {House} from '../../../../../model/house-model/house';
import {debounceTime, finalize} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {HousesImg} from '../../../../../model/house-model/housesImg';
import {HousesImgService} from '../../../../../service/house-service/houses-img.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';

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
  Img: any[] = [];
  // @ts-ignore
  mess: string;
  file: any;

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
  // tslint:disable-next-line:typedef
  getHouse(id) {
    return this.housesService.getOwnedHouse(id).toPromise();
  }

  // tslint:disable-next-line:typedef
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    const n = Date.now();
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, this.file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          console.log('Anh: ');
          console.log(this.downloadURL);
          this.downloadURL.subscribe(async (url) => {
            console.log(this.downloadURL);
            if (this.Img.length === 2) {
              this.Img[2] = url;
              console.log(this.Img[2]);
            }
            if (this.Img.length === 1) {
              this.Img[1] = url;
              console.log(this.Img[1]);
            }
            if (this.Img.length === 0) {
              this.Img[0] = url;
              console.log(this.Img[0]);
            }
          });
          if (this.Img.length === 4) {
            console.log(this.Img[0]);
            this.Img[0] = this.Img[3];
            this.Img.splice(3, 1);
          }
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
          this.mess = 'Bạn Đã Lựa Chọn Thành Công';
        }
      });
  }

  // tslint:disable-next-line:typedef
  async createHousesImg() {
    const house = await this.getHouse(this.id);
    console.log(house[0]);
    const houseImgs: HousesImg = {};
    houseImgs.houseId = house[0];
    houseImgs.isAvatar = false;
    for (let i = 0; this.Img.length > i; i++) {
      houseImgs.link = this.Img[i];
      console.log(houseImgs);
      this.housesImgService.createHouses(houseImgs).subscribe(() => {
        this.mess = 'Bạn đã thêm thành công';
        // this.do_alert();
      }, error => {
        console.log('Lỗi: ');
        console.log(error);
        this.mess = 'Bạn đã thêm thất bại';
      });
    }
  }

  // tslint:disable-next-line:typedef
  async deleteHousesImg(Img: []) {
    const deleteImg = Img;
    for (let i = 0; this.Img.length > i; i++) {
      if (deleteImg === this.Img[i]) {
        // const deleteImgs = this.Img.indexOf(Img[i])
        this.Img.splice(i, 1);
        this.mess = 'Bạn Đã Xóa Thành Công';
      }
    }
  }
}
