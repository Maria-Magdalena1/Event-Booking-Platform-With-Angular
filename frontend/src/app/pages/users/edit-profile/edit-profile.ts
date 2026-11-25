import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { form, FormField, FormRoot, required, min } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { EditProfileUser } from '../../../models/user/edit-profile-user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [RouterLink, FormField, FormRoot],
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

  errorMessage = signal('');

  profileForm = form(
    this.profileModel,
    (path) => {
      required(path.username);
      min(path.age, 0);
    },
    {
      submission: {
        action: async (field) => {
          this.errorMessage.set('');

          const currentUser = this.user();

          if (!currentUser) {
            this.errorMessage.set('User profile is not available.');

            return {
              kind: 'serverError',
              message: 'Could not update profile.',
            };
          }

          const updatedUser: EditProfileUser = {
            id: currentUser.id,
            email: currentUser.email,
            username: field().value().username,
            name: field().value().name,
            age: field().value().age,
          };

          try {
            await firstValueFrom(this.userService.updateProfile(updatedUser));

            await this.router.navigate(['/user/profile']);

            return undefined;
          } catch (error) {
            console.error('Error updating profile:', error);

            const message =
              error instanceof HttpErrorResponse
                ? error.error?.message || 'Could not update profile.'
                : 'Could not update profile.';

            this.errorMessage.set(message);

            return {
              kind: 'serverError',
              message,
            };
          }
        },
      },
    },
  );

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
}
