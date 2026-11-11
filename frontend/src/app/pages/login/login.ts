import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {LoginRequest} from '../../models/login-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: '../../shared/event-register-login-form.css',
})
export class Login {
  loginRequest: LoginRequest = {
    username: '',
    password: '',
  };

  errorMessage='';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  login() {
    this.errorMessage = '';
    this.authService.login(this.loginRequest).subscribe(
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
