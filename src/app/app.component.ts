import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {RatingService} from './service/rating-service/rating.service';
import {UserService} from './service/user-service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: any;
  user: any;
  title = 'caseStudy-Module6';
  isShowRateButton = false;
  // title = "cloudsSorage";
  // @ts-ignore
  selectedFile: File = null;
  // @ts-ignore
  fb;
  // @ts-ignore
  downloadURL: Observable<string>;
  notRatedBookingList: any;
  constructor( private storage: AngularFireStorage,
               private ratingService: RatingService,
               private userService: UserService) {}
  // @ts-ignore
  // tslint:disable-next-line:typedef
  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
  getCurrentUser() {
    // @ts-ignore
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    // @ts-ignore
    this.userService.getUserProfile(this.currentUser.username).subscribe(value => this.user = value);
  }

  ngOnInit(): void {
    this.getCurrentUser();
    if (this.user) {
      this.userService.findNotRatedBookingByUser(this.user.userId).subscribe((data) => {
        this.notRatedBookingList = data;
      });
    }
  }
}
