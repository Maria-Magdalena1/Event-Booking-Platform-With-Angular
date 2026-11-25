import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { form, FormField, FormRoot, required, minLength, maxLength } from '@angular/forms/signals';
import { RegisterRequest } from '../../models/user/register-request';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormField, FormRoot],
  templateUrl: './register.html',
  styleUrl: '../../shared/event-register-login-form.css',
})
export class Register {
  registerRequest = signal<RegisterRequest>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  errorMessage = signal('');
  registrationSuccessful = signal('');

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  registerForm = form(
    this.registerRequest,
    (path) => {
      required(path.username);
      minLength(path.username, 5);
      maxLength(path.username, 30);

      required(path.email);
      required(path.password);
      minLength(path.password, 8);

      required(path.confirmPassword);
    },
    {
      submission: {
        action: async () => {
          this.errorMessage.set('');
          this.registrationSuccessful.set('');

          if (this.registerRequest().password !== this.registerRequest().confirmPassword) {
            this.errorMessage.set('Passwords do not match');
            return;
          }
          try {
            await firstValueFrom(this.authService.register(this.registerRequest()));

            this.registrationSuccessful.set('Registration successful');

            await this.router.navigate(['/login']);
          } catch (error: any) {
            this.errorMessage.set(error.error?.message || 'Registration failed. Please try again.');
          }
        },
      },
    },
  );
}
