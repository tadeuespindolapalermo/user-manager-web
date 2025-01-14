import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/service/auth.service';

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const router = inject(Router);
  const authServer = inject(AuthService);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401 || err.status === 403) {
        authServer.logout();
      }

      if (err.status === 404) {
        router.navigate(['/page-not-found']);
      }

      if (err.status === 500) {
        router.navigate(['/server-error']);
      }

      return throwError(() => err);
    }),
  );
}
