import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UpdateCommand} from '@angular/cli/commands/update-impl';
import {UpdateProfileComponent} from './component/user/update-profile/update-profile.component';
import {ListUserComponent} from './component/user/list-user/list-user.component';

const routes: Routes = [{
  path: 'updateProfile/:id',
  component: UpdateProfileComponent
},
  {
    path: '',
    component: ListUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
