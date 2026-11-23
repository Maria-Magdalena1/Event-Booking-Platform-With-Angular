import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { form, FormField, required,min } from '@angular/forms/signals';
import { EditProfileUser } from '../../../models/edit-profile-user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [RouterLink, FormField, FormField],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile implements OnInit {
  user = signal<EditProfileUser | null>(null);

  profileModel = signal({
    username: '',
    name: '',
    age: 0,
  });

  profileForm = form(this.profileModel, (fields) => {
    required(fields.username);
    min(fields.age,0);
  });

  errorMessage = signal('');

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        const editUser: EditProfileUser = {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name ?? '',
          age: user.age ?? 0,
        };
        this.user.set(editUser);

        this.profileModel.set({
          username: user.username,
          name: user.name ?? '',
          age: user.age ?? 0,
        });
      },
      error: (error) => {
        this.errorMessage.set('Could not load profile');
        console.error(error);
      },
    });
  }

  updateProfile(): void {
    if (!this.profileForm().valid()) {
      return;
    }

    const currentUser = this.user();

    if (!currentUser) {
      return;
    }

    const updatedUser: EditProfileUser = {
      id:currentUser.id,
      email:currentUser.id,
      username:this.profileModel().username,
      name:this.profileModel().name,
      age:this.profileModel().age
    };

    this.userService.updateProfile(updatedUser).subscribe({
      next: () => {
        void this.router.navigate(['/user/profile']);
      },
      error: (error) => {
        console.error('Error updating profile:', error);

        this.errorMessage.set('Could not update profile.');

        if (error.error?.errors) {
          console.error('Validation errors:', error.error.errors);
        }
      }
    });
  }
}
