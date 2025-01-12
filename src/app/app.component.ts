import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NotificationsComponent} from './shared/components/notifications/notifications.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'user-manager-web';
}
