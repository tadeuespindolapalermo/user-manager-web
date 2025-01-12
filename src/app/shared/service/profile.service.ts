import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {Profile} from '../model/profile.model';
import {enviroment} from '../../../environments/enviroment';
import {ResponseData} from '../model/response-data.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = enviroment.baseUrlApi + '/profiles';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.baseUrl).pipe(
      map((res) => {
        return res as ResponseData;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  create(profile: Profile): Observable<ResponseData> {
    return this.http.post<ResponseData>(this.baseUrl, profile).pipe(
      map((res) => {
        return res as ResponseData;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getById(id: number): Observable<ResponseData> {
    return this.http.get<ResponseData>(`${this.baseUrl}/${id}`).pipe(
      map((res) => {
        return res as ResponseData;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  delete(id: number): Observable<ResponseData> {
    return this.http.delete<ResponseData>(`${this.baseUrl}/${id}`).pipe(
      map((res) => {
        return res as ResponseData;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

}
