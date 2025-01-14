import {Component, OnInit} from '@angular/core';
import {ConfirmationModalComponent} from "../../../shared/components/confirmation-modal/confirmation-modal.component";
import {Router} from '@angular/router';
import {Profile} from '../../../shared/model/profile.model';
import {ProfileService} from '../../../shared/service/profile.service';
import {NotificationService} from '../../../shared/service/notification.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-profile-list',
    imports: [
        ConfirmationModalComponent
    ],
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.css'
})
export class ProfileListComponent implements OnInit {

  profiles: Profile[] = [];
  profileId: number = 0;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private notificationService: NotificationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadProfiles();
  }

  loadProfiles(): void {
    this.profileService.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          this.profiles = res.data as Profile[];
        }
      },
      error: (err) => {
        console.log('Error searching for profiles', err);
        this.notificationService.showMessage('error', err.error.message);
      },
    });
  }

  deleteProfile(): void {
    if (this.profileId !== null) {
      this.profileService.delete(this.profileId).subscribe({
        next: (res) => {
          if (res.success) {
            this.notificationService.showMessage('success', 'Profile successfully removed');
            this.loadProfiles();
          }
        },
        error: (err) => {
          console.log("Error deleting profile", err);
          this.notificationService.showMessage('error', err.error.message);
        },
      });
    }
  }

  remove(profileId: number) {
    this.profileId = profileId;
    const modal = new (window as any).bootstrap.Modal(document.getElementById('confirmationModal')!);
    modal.show();
  }

  edit(profileId: number) {
    this.router.navigate(['/profile/register/' + profileId]);
  }

  new() {
    this.router.navigate(['/profile/register']);
  }

  goBack() {
    this.location.back();
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

}
