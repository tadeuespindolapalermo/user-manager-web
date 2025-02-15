import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {utils} from '../../../shared/util/utils';
import {FormsModule} from '@angular/forms';
import {ProfileService} from '../../../shared/service/profile.service';
import {Profile} from '../../../shared/model/profile.model';
import {NotificationService} from '../../../shared/service/notification.service';
import {AuthService} from '../../../shared/service/auth.service';

@Component({
  selector: 'user-assign-profile-modal',
  imports: [
    FormsModule
  ],
  templateUrl: './user-assign-profile-modal.component.html',
  styleUrl: './user-assign-profile-modal.component.css'
})
export class UserAssignProfileModalComponent implements OnInit {

  @Output() assignmentConfirmed = new EventEmitter<void>();
  @Output() profileIdChange = new EventEmitter<number>();

  selectedProfile: number = 0;
  profiles: Profile[] = [];

  constructor(
    private profileService: ProfileService,
    private notificationService: NotificationService,
    private authServer: AuthService
  ) { }

  ngOnInit() {
    if (this.authServer.isUserAdmin()) {
      this.loadProfiles();
    }
  }

  assignProfile(selectedProfile: number): void {
    this.profileIdChange.emit(selectedProfile);
    this.assignmentConfirmed.emit();
    this.closeModal();
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

  closeModal(): void {
    utils.closeModal('userAssignProfileModal')
  }

}
