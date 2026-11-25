import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EditProfileUser } from '../models/user/edit-profile-user';

import { User } from '../models/user/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }

  updateProfile(user: EditProfileUser): Observable<User> {
    return this.http.put<User>(
      `${this.apiUrl}/user/profile/edit`,
      user
    );
  }

  toggleBlockUser(userId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/block/${userId}`, {});
  }
}
