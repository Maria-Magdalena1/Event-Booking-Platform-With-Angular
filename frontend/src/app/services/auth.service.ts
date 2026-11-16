import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,tap } from 'rxjs';
import { RegisterRequest } from '../models/register-request';
import { LoginRequest } from '../models/login-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  register(registerRequest: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, registerRequest);
  }

  isAuthenticated = signal(false);

  login(loginRequest: LoginRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/login`, loginRequest).pipe(
      tap(() => {
        this.isAuthenticated.set(true);
      }),
    );
  }
}
