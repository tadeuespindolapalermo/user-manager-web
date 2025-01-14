import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/service/auth.service';
import {NotificationService} from '../../shared/service/notification.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        const authorization = response['Authorization'];
        if (authorization) {
          const token = response['Authorization'].split('Bearer')[1];
          this.authService.saveToken(token.trim());
          this.router.navigate(['/dashboard']);
        } else {
          this.notificationService.showMessage('error', response.message);
        }
      },
      error: (err) => {
        this.notificationService.showMessage('error', err.error.message);
        console.error('Authentication error', err);
        this.router.navigate(['/login']);
      },
    });
  }

}
