import {Component, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {form,FormField} from '@angular/forms/signals';
import {RegisterRequest} from '../../models/register-request';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormField
  ],
  templateUrl: './register.html',
  styleUrl: '../../shared/event-register-login-form.css',
})
export class Register {
  registerRequest=signal<RegisterRequest>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  registerForm=form(this.registerRequest);

  errors: { [key: string]: string } = {};
  registrationSuccessful = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  register() {
    this.errors = {};
    this.registrationSuccessful = '';

    if (this.registerRequest().password !== this.registerRequest().confirmPassword) {
      this.errors['confirmPassword'] = 'Passwords do not match';
      return;
    }
    this.authService.register(this.registerRequest()).subscribe(
      {
        next: () => {
          this.registrationSuccessful = 'Registration successful';

          this.router.navigate(['/login']);
        },
        error: (error) => {
          //can you explain it in the meeting, it's a little complicated
          if (error.error?.errors) {
            this.errors = error.error.errors;
          } else {
            this.errors['general'] =
              error.error?.message || 'Registration failed. Please try again.';
          }
        }
      });
  }
}
