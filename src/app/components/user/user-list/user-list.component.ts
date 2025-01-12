import {Component, OnInit} from '@angular/core';
import {User} from '../../../shared/model/user.model';
import {UserService} from '../../../shared/service/user.service';
import {Router} from '@angular/router';
import {ConfirmationModalComponent} from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import {UserAssignProfileModalComponent} from '../user-assign-profile-modal/user-assign-profile-modal.component';
import {AssignmentProfile} from '../../../shared/model/assignment-profile.model';
import {FormsModule} from '@angular/forms';
import {NotificationService} from '../../../shared/service/notification.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [
    ConfirmationModalComponent,
    UserAssignProfileModalComponent,
    FormsModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  userId: number = 0;
  profileId: number = 0;

  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  setProfileId(profileId: number) {
    this.profileId = profileId;
  }

  loadUsers(): void {
    this.userService.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          this.users = res.data as User[];
        }
      },
      error: (err) => {
        console.log('Error searching for users', err);
        this.notificationService.showMessage('error', err.error.message);
      },
    });
  }

  deleteUser(): void {
    if (this.userId !== null) {
      this.userService.delete(this.userId).subscribe({
        next: (res) => {
          if (res.success) {
            this.notificationService.showMessage('success', 'User successfully removed');
            this.loadUsers();
          }
        },
        error: (err) => {
          console.log("Error deleting user", err);
          this.notificationService.showMessage('error', err.error.message);
        },
      });
    }
  }

  assignProfile(): void {
    const assignmentProfile: AssignmentProfile = {
      userId: this.userId,
      profileId: this.profileId
    }
    if (this.userId && this.profileId) {
      this.userService.assignProfile(assignmentProfile).subscribe({
        next: (res) => {
          if (res.success) {
            this.notificationService.showMessage('success', 'Profile successfully assignment');
            this.loadUsers();
          } else {

          }
        },
        error: (err) => {
          console.log("Error assigning profile", err);
          this.notificationService.showMessage('error', err.error.message);
        },
      });
    }
  }

  assign(userId: number, profileId: number) {
    this.userId = userId;
    this.profileId = profileId;
    const modal = new (window as any).bootstrap.Modal(document.getElementById('userAssignProfileModal')!);
    modal.show();
  }

  remove(userId: number) {
    this.userId = userId;
    const modal = new (window as any).bootstrap.Modal(document.getElementById('confirmationModal')!);
    modal.show();
  }

  edit(userId: number) {
    this.router.navigate(['/user/register/' + userId]);
  }

  new() {
    this.router.navigate(['/user/register']);
  }

  goBack() {
    this.location.back();
  }

  goToDashboard() {
    this.router.navigate(['/']);
  }

}
