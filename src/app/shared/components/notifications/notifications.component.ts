import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../service/notification.service';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'notifications',
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {

  notification: { type: string; message: string; } | undefined;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.message$.subscribe((msg) => {
      this.notification = msg;
      setTimeout(() => (this.notification = undefined), 5000);
    });
  }

}
