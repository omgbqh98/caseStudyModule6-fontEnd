import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// <<<<<<< HEAD
import { HeaderComponent } from './_shared/header/header.component';
import { FooterComponent } from './_shared/footer/footer.component';
import { SearchComponent } from './_shared/search/search.component';
import { HomeContentComponent } from './modules/home-content/home-content.component';
import { ListAllHousesComponent } from './modules/page-content/houses/list/list-all-houses/list-all-houses.component';
import { ListOwnHousesComponent } from './modules/page-content/houses/list/list-own-houses/list-own-houses.component';
import { AboutContentComponent } from './_shared/about-content/about-content.component';
import { UserShowComponent } from './modules/page-content/user/detail/user-show/user-show.component';
import { UserUpdateComponent } from './modules/page-content/user/update/user-update/user-update.component';
import { HouseDetailPostedComponent } from './modules/page-content/houses/detail/house-detail-posted/house-detail-posted.component';
import { HouseDetailViewComponent } from './modules/page-content/houses/detail/house-detail-view/house-detail-view.component';
import { CreateHouseComponent } from './modules/page-content/houses/create/create-house/create-house.component';
import { PostedHouseEditComponent } from './modules/page-content/houses/edit/posted-house-edit/posted-house-edit.component';
import { UserChangePasswordComponent } from './modules/page-content/user/update/user-change-password/user-change-password.component';
import { ListRentedHousesComponent } from './modules/page-content/booking/list/list-rented-houses/list-rented-houses.component';
import { UserCheckInComponent } from './modules/page-content/booking/edit/user-check-in/user-check-in.component';
import { BookingHotelComponent } from './modules/page-content/booking/create/booking-hotel/booking-hotel.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './modules/page-content/user/login/login.component';
// =======
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// import { UpdateProfileComponent } from './component/user/update-profile/update-profile.component';
// import { ListUserComponent } from './component/user/list-user/list-user.component';
// import { UpdatePasswordComponent } from './component/user/update-password/update-password.component';
// import { ProfileComponent } from './component/user/profile/profile.component';
// import { LoginComponent } from './component/user/login/login.component';
// import { HomeComponent } from './component/home/home/home.component';
import {JwtInterceptor} from './helper/jwt-interceptor';
import {ErrorInterceptor} from './helper/error-interceptor';
// import {UpdateProfileComponent} from './component/user/update-profile/update-profile.component';
// import {UpdatePasswordComponent} from './component/user/update-password/update-password.component';
// >>>>>>> 770c87ac2b1ccf43b5feebfaa58a2a0bc28407b2

@NgModule({
  declarations: [
    AppComponent,
// <<<<<<< HEAD
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    HomeContentComponent,
    ListAllHousesComponent,
    ListOwnHousesComponent,
    AboutContentComponent,
    UserShowComponent,
    UserUpdateComponent,
    HouseDetailPostedComponent,
    HouseDetailViewComponent,
    CreateHouseComponent,
    PostedHouseEditComponent,
    UserChangePasswordComponent,
    ListRentedHousesComponent,
    UserCheckInComponent,
    BookingHotelComponent,
    LoginComponent,
// =======
//     UpdateProfileComponent,
    // ListUserComponent,
    // UpdatePasswordComponent,
    // ProfileComponent,
    LoginComponent,
    // HomeComponent
// >>>>>>> 770c87ac2b1ccf43b5feebfaa58a2a0bc28407b2
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
