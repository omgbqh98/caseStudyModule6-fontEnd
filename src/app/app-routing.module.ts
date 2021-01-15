// <<<<<<< HEAD
// import {NgModule} from '@angular/core';
// import {Routes, RouterModule} from '@angular/router';
// import {HomeContentComponent} from './modules/home-content/home-content.component';
import {ListAllHousesComponent} from './modules/page-content/houses/list/list-all-houses/list-all-houses.component';
import {ListOwnHousesComponent} from './modules/page-content/houses/list/list-own-houses/list-own-houses.component';
import {AboutContentComponent} from './_shared/about-content/about-content.component';
import {UserShowComponent} from './modules/page-content/user/detail/user-show/user-show.component';
import {UserUpdateComponent} from './modules/page-content/user/update/user-update/user-update.component';
import {HouseDetailViewComponent} from './modules/page-content/houses/detail/house-detail-view/house-detail-view.component';
import {UserChangePasswordComponent} from './modules/page-content/user/update/user-change-password/user-change-password.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeContentComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'houses',
    component: ListAllHousesComponent
  },
  {
    path: 'my-houses',
    component: ListOwnHousesComponent
  },
  {
    path: 'about',
    component: AboutContentComponent
  },
  {
    path: 'user-show/:id',
    component: UserShowComponent
  },
  {
    path: 'user-update/:username',
    component: UserUpdateComponent
  },
  {
    path: 'house-view',
    component: HouseDetailViewComponent
  },
  {
    path: 'change-password/:id',
    component: UserChangePasswordComponent
  }
  ];
// =======
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UpdateCommand} from '@angular/cli/commands/update-impl';
// import {UpdateProfileComponent} from './component/user/update-profile/update-profile.component';
import {ListUserComponent} from './component/user/list-user/list-user.component';
import {ProfileComponent} from './component/user/profile/profile.component';
import {LoginComponent} from './component/user/login/login.component';
import {AuthGuard} from './helper/auth-guard';
import {HomeComponent} from './component/home/home/home.component';
import {UpdateProfileComponent} from './component/user/update-profile/update-profile.component';
import {UpdatePasswordComponent} from './component/user/update-password/update-password.component';
import {HomeContentComponent} from './modules/home-content/home-content.component';



// const routes: Routes = [
// //   {
// //   path: 'hello',
// //   component: HomeContentComponent,
// // },
//   {
//     path: '',
//     component: HomeContentComponent,
//   },
//   {
//     path: 'login',
//     component: LoginComponent
//   },
//   {
//     path: 'hello/profile/:id',
//     component: ProfileComponent
//   },
//   {
//     path: 'updateProfile/:username',
//     component: UpdateProfileComponent
//   },
//   {
//     path: 'updatePassword/:id',
//     component: UpdatePasswordComponent
//   },
// >>>>>>> 770c87ac2b1ccf43b5feebfaa58a2a0bc28407b2
// ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
