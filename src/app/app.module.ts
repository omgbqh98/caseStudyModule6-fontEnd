import {MbscModule} from '@mobiscroll/angular';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './_shared/header/header.component';
import {FooterComponent} from './_shared/footer/footer.component';
import {SearchComponent} from './_shared/search/search.component';
import {HomeContentComponent} from './modules/home-content/home-content.component';
import {ListAllHousesComponent} from './modules/page-content/houses/list/list-all-houses/list-all-houses.component';
import {ListOwnHousesComponent} from './modules/page-content/houses/list/list-own-houses/list-own-houses.component';
import {AboutContentComponent} from './_shared/about-content/about-content.component';
import {UserShowComponent} from './modules/page-content/user/detail/user-show/user-show.component';
import {HouseDetailPostedComponent} from './modules/page-content/houses/detail/house-detail-posted/house-detail-posted.component';
import {HouseDetailViewComponent} from './modules/page-content/houses/detail/house-detail-view/house-detail-view.component';
import {CreateHouseComponent} from './modules/page-content/houses/create/create-house/create-house.component';
import {PostedHouseEditComponent} from './modules/page-content/houses/edit/posted-house-edit/posted-house-edit.component';
import {UserChangePasswordComponent} from './modules/page-content/user/update/user-change-password/user-change-password.component';
import {ListRentedHousesComponent} from './modules/page-content/booking/list/list-rented-houses/list-rented-houses.component';
import {UserCheckInComponent} from './modules/page-content/booking/edit/user-check-in/user-check-in.component';
import {BookingHotelComponent} from './modules/page-content/booking/create/booking-hotel/booking-hotel.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './modules/authentication/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './helper/jwt-interceptor';
import {ErrorInterceptor} from './helper/error-interceptor';
import {HistoryBookingComponent} from './modules/history-booking/history-booking.component';
import {StatisticsComponent} from './modules/statistics/statistics.component';
import {ListRentHousesByTimeComponent} from './modules/list-rent-houses-by-time/list-rent-houses-by-time.component';
import {UserUpdateComponent} from './modules/page-content/user/update/user-update/user-update.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
// import {environment} from "../environments/environment";
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/database';
import { RatingCreateComponent } from './modules/rating/rating-create/rating-create.component';
import { RatingListComponent } from './modules/rating/rating-list/rating-list.component';
import {CreateHousesImgComponent} from './modules/page-content/houses/create/create-houses-img/create-houses-img.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from "ngx-pagination";
import { ListComponent } from './modules/page-content/user/list/list.component';
import { UserShowForAllComponent } from './modules/page-content/user/detail/user-show-for-all/user-show-for-all.component';
import { ListHousesOfHostComponent } from './modules/page-content/houses/list/list-houses-of-host/list-houses-of-host.component';


// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    HomeContentComponent,
    ListAllHousesComponent,
    ListOwnHousesComponent,
    AboutContentComponent,
    UserShowComponent,
    // UserUpdateComponent,
    HouseDetailPostedComponent,
    HouseDetailViewComponent,
    CreateHouseComponent,
    PostedHouseEditComponent,
    UserChangePasswordComponent,
    ListRentedHousesComponent,
    UserCheckInComponent,
    BookingHotelComponent,
    LoginComponent,
    LoginComponent,
    HistoryBookingComponent,
    StatisticsComponent,
    ListRentHousesByTimeComponent,
    UserUpdateComponent,
    RatingCreateComponent,
    RatingListComponent,
    CreateHousesImgComponent,
    SearchComponent,
    ListComponent,
    UserShowForAllComponent,
    ListHousesOfHostComponent,
  ],
  imports: [
    MbscModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
