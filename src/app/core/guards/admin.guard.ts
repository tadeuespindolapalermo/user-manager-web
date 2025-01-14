import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../shared/service/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticated() && !authService.isUserAdmin()) {
    router.navigate(['/resource-not-available']);
    return false;
  }
  return true;

};
