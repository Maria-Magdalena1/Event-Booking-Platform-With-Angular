import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { form, FormField, FormRoot,required} from '@angular/forms/signals';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login-request';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormField,FormRoot],
  templateUrl: './login.html',
  styleUrl: '../../shared/event-register-login-form.css',
})
export class Login {
  loginRequest = signal<LoginRequest>({
    username: '',
    password: '',
  });

  errorMessage = signal('');

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  loginForm = form(
    this.loginRequest,
    (path)=>{
      required(path.username);
      required(path.password);
    },
    {
      submission: {
        action: async () => {
          this.errorMessage.set('');

          this.authService.login(this.loginRequest()).subscribe({
            next: (response) => {
              console.log('Login successful!', response);
              void this.router.navigate(['/events']);
            },
            error: (error:HttpErrorResponse) => {
              this.errorMessage.set(
                error.error?.message || 'Invalid username or password'
              );
            },
          });
        }
      }
    }
  );
}
