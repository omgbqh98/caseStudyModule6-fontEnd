import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// import { UpdateProfileComponent } from './component/user/update-profile/update-profile.component';
import { ListUserComponent } from './component/user/list-user/list-user.component';
// import { UpdatePasswordComponent } from './component/user/update-password/update-password.component';
import { ProfileComponent } from './component/user/profile/profile.component';
import { LoginComponent } from './component/user/login/login.component';
import { HomeComponent } from './component/home/home/home.component';
import {JwtInterceptor} from './helper/jwt-interceptor';
import {ErrorInterceptor} from './helper/error-interceptor';
import {UpdateProfileComponent} from './component/user/update-profile/update-profile.component';
import {UpdatePasswordComponent} from './component/user/update-password/update-password.component';

@NgModule({
  declarations: [
    AppComponent,
    UpdateProfileComponent,
    ListUserComponent,
    UpdatePasswordComponent,
    ProfileComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
