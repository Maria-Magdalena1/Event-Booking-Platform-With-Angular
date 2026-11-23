import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { RegisterRequest } from '../models/register-request';
import { LoginRequest } from '../models/login-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  isAuthenticated = signal(false);

  constructor(private http: HttpClient) {}

  register(registerRequest: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, registerRequest);
  }

  login(loginRequest: LoginRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/login`, loginRequest).pipe(
      tap(() => {
        this.isAuthenticated.set(true);
      }),
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.isAuthenticated.set(false);
      }),
    );
  }
}
