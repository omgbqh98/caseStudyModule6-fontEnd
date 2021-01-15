import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UpdateCommand} from '@angular/cli/commands/update-impl';
import {UpdateProfileComponent} from './component/user/update-profile/update-profile.component';
import {ListUserComponent} from './component/user/list-user/list-user.component';
import {ProfileComponent} from './component/user/profile/profile.component';
import {LoginComponent} from './component/user/login/login.component';
import {AuthGuard} from './helper/auth-guard';
import {HomeComponent} from './component/home/home/home.component';



const routes: Routes = [{
  path: 'hello',
  component: HomeComponent,
  canActivate: [AuthGuard]
},
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
