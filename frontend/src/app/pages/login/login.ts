import {Component,signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {form,FormField} from '@angular/forms/signals';
import {AuthService} from '../../services/auth.service';
import {LoginRequest} from '../../models/login-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormField
  ],
  templateUrl: './login.html',
  styleUrl: '../../shared/event-register-login-form.css',
})
export class Login {
  loginRequest=signal<LoginRequest>({
    username: '',
    password: '',
  });

  loginForm=form(this.loginRequest);

  errorMessage='';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  login() {
    this.errorMessage = '';
    this.authService.login(this.loginRequest()).subscribe(
      {
        next: (response) => {
          console.log('Login successful!', response);
          this.router.navigate(['/events'])

          //i have a warning "Promise returned from navigate is ignored"
          //do we have to add .then(r => )
          //same in the register
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Invalid username or password';
        }
      });
  }
}
