import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../shared/service/user.service';
import {User} from '../../../shared/model/user.model';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../shared/service/notification.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-register',
  imports: [
    FormsModule
  ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {

  user: any = {
    name: '',
    email: '',
    password: '',
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private location: Location
  ) {}

  ngOnInit() {
    const idUser: string | null = this.route.snapshot.paramMap.get('id');

    if (idUser) {
      this.loadUser(parseInt(idUser));
    }
  }

  onSubmit(): void {
    this.userService.create(this.user).subscribe({
      next: (res) => {
        if (res.success) {
          this.notificationService.showMessage('success', "User saved successfully!");
          this.router.navigate(['/user/list']);
        }
      },
      error: (err) => {
        console.log('Error registering new user', err);
        this.notificationService.showMessage('error', err.error.message);
      },
    }
    );
  }

  loadUser(id: number): void {
    this.userService.getById(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.user = res.data as User[];
        }
      },
      error: (err) => {
        console.log('Error searching for users', err);
        this.notificationService.showMessage('error', err.error.message);
      },
    });
  }

  goBack() {
    this.location.back();
  }

}
