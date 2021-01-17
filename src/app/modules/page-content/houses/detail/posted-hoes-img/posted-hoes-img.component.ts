import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../../service/authen-service/auth.service';
import {UserService} from '../../../../../service/user-service/user.service';
import {HouseService} from '../../../../../service/house-service/house.service';
import {House} from '../../../../../model/house-model/house';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-posted-hoes-img',
  templateUrl: './posted-hoes-img.component.html',
  styleUrls: ['./posted-hoes-img.component.css']
})
export class PostedHoesImgComponent implements OnInit {

// tslint:disable-next-line:max-line-length
  constructor(private activate: ActivatedRoute, private formBuilder: FormBuilder, private authService: AuthService, private  userService: UserService, private  housesService: HouseService, private storage: AngularFireStorage) {
  }

  id: any;
  // @ts-ignore
  houses: Houses;
  // @ts-ignore
  newFromHouses: FromGroup;
  // @ts-ignore
  newFromHouse: FormGroup;
  // @ts-ignore
  houses: House[] = [];
  // @ts-ignore
  fb;
  // @ts-ignore
  selectedFile: File = null;
  // @ts-ignore
  downloadURL: Observable<string>;

  ngOnInit(): void {
    // @ts-ignore
    this.newFromHouse = this.formBuilder.group({
      // imageId: ['', Validators.required],
      houseId: ['', Validators.required],
      link: ['', Validators.required]
    });
    this.activate.params.subscribe((params: Params) => {
      this.id = params.id;
      // @ts-ignore
      this.housesService.getHousesId(this.id).subscribe(result => {
        this.houses = result;
        this.newFromHouses.patchValue({
          link: this.houses.link,
        });
      });
    });
  }

  // // tslint:disable-next-line:typedef
  // createHousesImg() {
  //   // tslint:disable-next-line:prefer-const
  //   let newHousesImg: HousesImg;
  //   // @ts-ignore
  //   newHousesImg.houseId = this.houses;
  //   // @ts-ignore
  //   newHousesImg.link = this.fb;
  //   // @ts-ignore
  //   newHouses.isAvatar = 'true';
  //   // @ts-ignore
  //   this.housesService.CreateImg(newHousesImg).subscribe(() => {
  //     alert('thành công');
  //   });
  // }
  //
  // // tslint:disable-next-line:typedef
  // // @ts-ignore
  // // tslint:disable-next-line:typedef
  // onFileSelected(event) {
  //   const n = Date.now();
  //   const file = event.target.files[0];
  //   const filePath = `RoomsImages/${n}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(`RoomsImages/${n}`, file);
  //   // @ts-ignore
  //   // @ts-ignore
  //   // @ts-ignore
  //   task
  //     .snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         this.downloadURL = fileRef.getDownloadURL();
  //         console.log(this.downloadURL);
  //         this.downloadURL.subscribe(url => {
  //           console.log(this.downloadURL);
  //           if (url) {
  //             console.log(url);
  //             this.fb = url;
  //           }
  //           console.log(this.fb);
  //         });
  //       })
  //     )
  //     .subscribe((url) => {
  //       if (url) {
  //         console.log(url);
  //       }
  //     });
  // }
}
