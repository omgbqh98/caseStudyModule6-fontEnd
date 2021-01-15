import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateUserComponent} from './create-user/create-user.component';
// import {UpdateProfileComponent} from './update-profile/update-profile.component';

const routes: Routes = [
  {
    path: '',
    component: CreateUserComponent
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
