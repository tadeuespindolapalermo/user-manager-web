import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../shared/service/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
    private authServer: AuthService,
    private router: Router
  ) { }

  isUserAdmin() {
    return this.authServer.isUserAdmin();
  }

  logout() {
    this.authServer.logout();
    this.router.navigate(['/'])
  }
}
