import { Routes } from '@angular/router';
import {UserListComponent} from './components/user/user-list/user-list.component';
import {UserRegisterComponent} from './components/user/user-register/user-register.component';
import {ProfileListComponent} from './components/profile/profile-list/profile-list.component';
import {ProfileRegisterComponent} from './components/profile/profile-register/profile-register.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {authGuard} from './core/guards/auth.guard';
import {
  ResourceNotAvailableComponent
} from './shared/components/resource-not-available/resource-not-available.component';
import {adminGuard} from './core/guards/admin.guard';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {ServerErrorComponent} from './shared/components/server-error/server-error.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    data: {
      roles: ['USER', 'ADMIN']
    }
  },
  {
    path: 'user/list',
    component: UserListComponent,
    canActivate: [authGuard],
    data: {
      roles: ['USER', 'ADMIN']
    }
  },
  {
    path:'user/register',
    component: UserRegisterComponent,
    canActivate: [authGuard, adminGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path:'user/register/:id',
    component: UserRegisterComponent,
    canActivate: [authGuard],
    data: {
      roles: ['USER', 'ADMIN']
    }
  },
  {
    path: 'profile/list',
    component: ProfileListComponent,
    canActivate: [authGuard, adminGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path:'profile/register',
    component: ProfileRegisterComponent,
    canActivate: [authGuard, adminGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path:'profile/register/:id',
    component: ProfileRegisterComponent,
    canActivate: [authGuard, adminGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'resource-not-available',
    component: ResourceNotAvailableComponent,
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
  },
];
