import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {inject} from '@angular/core';
import {LocalStorageService} from '../../shared/service/local-storage.service';

export function jwtInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const localStorage = inject(LocalStorageService);

  const token = localStorage.get('token');
  const isApiUrl = req.url.startsWith(environment.baseUrlApi);

  if (token && isApiUrl) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  console.log(req.url);
  return next(req);
}
