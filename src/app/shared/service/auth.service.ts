import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ResponseData} from '../model/response-data.model';
import {LocalStorageService} from './local-storage.service';
import {Constants} from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.baseUrlApi;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  login(email: string, password: string): Observable<ResponseData> {
    const loginBody = {
      email: email,
      password: password
    };
    return this.http.post<ResponseData>(`${this.apiUrl}/auth`, loginBody);
  }

  saveToken(token: string): void {
    this.localStorage.set('token', token);
  }

  getToken(): string | null {
    return this.localStorage.get('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.roles[0];
    }
    return '';
  }

  isUserAdmin(): boolean {
    return this.getUserRole() === Constants.PROFILE_ADMIN;
  }

  logout() {
    this.localStorage.clear();
  }

}
