import {Injectable, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RegisterRequest} from '../models/register-request';
import {LoginRequest} from '../models/login-request';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  register(registerRequest:RegisterRequest):Observable<any> {
    return this.http.post(`${this.apiUrl}/register`,registerRequest);
  }

  isAuthenticated=signal(false);

  login(loginRequest:LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginRequest
    ).pipe(tap(()=>{
      this.isAuthenticated.set(true);
    }));
  }
}
