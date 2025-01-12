import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {utils} from '../../../shared/util/utils';
import {FormsModule} from '@angular/forms';
import {ProfileService} from '../../../shared/service/profile.service';
import {User} from '../../../shared/model/user.model';
import {Profile} from '../../../shared/model/profile.model';
import {NotificationService} from '../../../shared/service/notification.service';

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
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.loadProfiles();
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
          this.profiles = res.data as User[];
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
