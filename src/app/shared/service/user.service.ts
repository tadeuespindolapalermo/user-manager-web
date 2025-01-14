import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {User} from '../model/user.model';
import {environment} from '../../../environments/environment';
import {ResponseData} from "../model/response-data.model";
import {AssignmentProfile} from "../model/assignment-profile.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrlApi + '/users';

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

  create(user: User): Observable<ResponseData> {
    return this.http.post<ResponseData>(this.baseUrl, user).pipe(
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

  assignProfile(assignmentProfile: AssignmentProfile): Observable<ResponseData> {
    return this.http.post<ResponseData>(`${this.baseUrl}/assign-profile`, assignmentProfile).pipe(
      map((res) => {
        return res as ResponseData;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

}
