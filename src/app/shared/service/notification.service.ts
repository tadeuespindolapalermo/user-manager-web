import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  private messageSource = new Subject<{ type: string; message: string }>();
  message$ = this.messageSource.asObservable();

  showMessage(type: string, message: string) {
    this.messageSource.next({ type, message });
  }
}
