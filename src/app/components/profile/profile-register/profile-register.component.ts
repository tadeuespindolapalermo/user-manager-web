import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserService} from '../../../shared/service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../shared/model/user.model';
import {ProfileService} from '../../../shared/service/profile.service';
import {NotificationService} from '../../../shared/service/notification.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-profile-register',
    imports: [
        FormsModule
    ],
  templateUrl: './profile-register.component.html',
  styleUrl: './profile-register.component.css'
})
export class ProfileRegisterComponent implements OnInit {

  profile: any = {
    name: ''
  };

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private location: Location
  ) {}

  ngOnInit() {
    const idProfile: string | null = this.route.snapshot.paramMap.get('id');

    if (idProfile) {
      this.loadProfile(parseInt(idProfile));
    }
  }

  onSubmit(): void {
    this.profileService.create(this.profile).subscribe({
        next: (res) => {
          if (res.success) {
            this.notificationService.showMessage('success', 'Profile creates successfully');
            this.router.navigate(['/profile/list']);
          }
        },
        error: (err) => {
          console.log('Error registering new profile', err);
          this.notificationService.showMessage('error', err.error.message);
        },
      }
    );
  }

  loadProfile(id: number): void {
    this.profileService.getById(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.profile = res.data as User[];
        }
      },
      error: (err) => {
        console.log('Error searching for profiles', err);
        this.notificationService.showMessage('error', err.error.message);
      },
    });
  }

  goBack() {
    this.location.back();
  }

}
