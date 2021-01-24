import {ListAllHousesComponent} from './modules/page-content/houses/list/list-all-houses/list-all-houses.component';
import {ListOwnHousesComponent} from './modules/page-content/houses/list/list-own-houses/list-own-houses.component';
import {AboutContentComponent} from './_shared/about-content/about-content.component';
import {UserShowComponent} from './modules/page-content/user/detail/user-show/user-show.component';
// import {UserUpdateComponent} from './modules/page-content/user/update/user-update/user-update.component';
import {HouseDetailViewComponent} from './modules/page-content/houses/detail/house-detail-view/house-detail-view.component';
import {UserChangePasswordComponent} from './modules/page-content/user/update/user-change-password/user-change-password.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeContentComponent} from './modules/home-content/home-content.component';
import {LoginComponent} from './modules/authentication/login/login.component';
import {AuthGuard} from './helper/auth-guard';
import {UserUpdateComponent} from './modules/page-content/user/update/user-update/user-update.component';

import {CreateHouseComponent} from './modules/page-content/houses/create/create-house/create-house.component';
import {HistoryBookingComponent} from './modules/history-booking/history-booking.component';
import {HouseDetailPostedComponent} from './modules/page-content/houses/detail/house-detail-posted/house-detail-posted.component';
import {PostedHouseEditComponent} from './modules/page-content/houses/edit/posted-house-edit/posted-house-edit.component';
import {CreateHousesImgComponent} from './modules/page-content/houses/create/create-houses-img/create-houses-img.component';

import {ListRentedHousesComponent} from './modules/page-content/booking/list/list-rented-houses/list-rented-houses.component';
import {StatisticsComponent} from './modules/statistics/statistics.component';
import {ListRentHousesByTimeComponent} from './modules/list-rent-houses-by-time/list-rent-houses-by-time.component';

import {SearchComponent} from './_shared/search/search.component';
import {ListComponent} from './modules/page-content/user/list/list.component';
import {UserShowForAllComponent} from './modules/page-content/user/detail/user-show-for-all/user-show-for-all.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeContentComponent,
    // canActivate: [AuthGuard]
  }, {
    path: 'houses',
    component: ListAllHousesComponent
  },
  // {
  //   path: 'my-houses',
  //   component: ListOwnHousesComponent
  // },
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
    path: 'house-view/:id',
    component: HouseDetailViewComponent
  },
  {
    path: 'change-password/:id',
    component: UserChangePasswordComponent
  },
  {
    path: 'list-rented-houses/:id',
    component: HistoryBookingComponent
  },
  {
    path: 'houses-create',
    component: CreateHouseComponent
  },
  {
    path: 'user-ownHouse/:id',
    component: HouseDetailPostedComponent
  },
  {
    path: 'houses-update/:id',
    component: PostedHouseEditComponent
  }, {
    path: 'list-rented-houses',
    component: ListRentedHousesComponent
  }, {
    path: 'statistics/:id',
    component: StatisticsComponent
  },
  {
    path: 'houses-img/:id',
    component: CreateHousesImgComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'list-rent-houses-by-time/:id',
    component: ListRentHousesByTimeComponent
  },
  {
    path: 'hosts',
    component: ListComponent
  },
  {
    path: 'hosts/:id',
    component: UserShowForAllComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
