import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../shared/service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  const role = authService.getUserRole();
  if (authService.isAuthenticated()) {
    // if (route.data['roles'] && route.data['roles'].indexOf(role) === -1) {
    //   router.navigate(['/dashboard']);
    //   return false;
    // }
    // if (!authService.isUserAdmin()) {
    //   router.navigate(['/resource-not-available']);
    //   return false;
    // }
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }

};
