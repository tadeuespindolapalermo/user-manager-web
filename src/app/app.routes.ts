import { Routes } from '@angular/router';
import {UserListComponent} from './components/user/user-list/user-list.component';
import {UserRegisterComponent} from './components/user/user-register/user-register.component';
import {ProfileListComponent} from './components/profile/profile-list/profile-list.component';
import {ProfileRegisterComponent} from './components/profile/profile-register/profile-register.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'user/list',
    component: UserListComponent
  },
  {
    path:'user/register',
    component: UserRegisterComponent
  },
  {
    path:'user/register/:id',
    component: UserRegisterComponent
  },

  {
    path: 'profile/list',
    component: ProfileListComponent
  },
  {
    path:'profile/register',
    component: ProfileRegisterComponent
  },
  {
    path:'profile/register/:id',
    component: ProfileRegisterComponent
  }
];
