import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    RouterLink
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {}

//import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router, RouterLink } from '@angular/router';
// import { DatePipe } from '@angular/common';
//
// interface User {
//   id: number;
//   username: string;
//   email: string;
//   name: string | null;
//   age: number | null;
//   createdAt: string;
//   role: string;
//   active: boolean;
// }
//
// interface Event {
//   id: number;
//   name: string;
//   startDate: string;
//   endDate: string;
//   totalSeats: number;
//   availableSeats: number;
// }
//
// interface Booking {
//   id: number;
//   event: {
//     name: string;
//     startDate: string;
//     endDate: string;
//   };
//   bookedOn: string;
//   seatsBooked: number;
//   status: {
//     name: string;
//     displayName: string;
//   };
// }
//
// interface ProfileResponse {
//   user: User;
//   isAdmin: boolean;
//   allUsers: User[];
//   createdEvents: Event[];
//   bookings: Booking[];
// }
//
// @Component({
//   selector: 'app-profile',
//   standalone: true,
//   imports: [RouterLink, DatePipe],
//   templateUrl: './profile.html',
//   styleUrl: './profile.css'
// })
// export class ProfileComponent implements OnInit {
//
//   user: User | null = null;
//
//   isAdmin = false;
//
//   allUsers: User[] = [];
//
//   createdEvents: Event[] = [];
//
//   bookings: Booking[] = [];
//
//   constructor(
//     private http: HttpClient,
//     private router: Router
//   ) {}
//
//   ngOnInit(): void {
//     this.loadProfile();
//   }
//
//   // Load profile information
//   loadProfile(): void {
//
//     this.http.get<ProfileResponse>(
//       'http://localhost:8080/api/user/profile',
//       { withCredentials: true }
//     ).subscribe({
//
//       next: (data) => {
//
//         this.user = data.user;
//
//         this.isAdmin = data.isAdmin;
//
//         this.allUsers = data.allUsers ?? [];
//
//         this.createdEvents = data.createdEvents ?? [];
//
//         this.bookings = data.bookings ?? [];
//
//       },
//
//       error: (error) => {
//         console.error('Error loading profile:', error);
//       }
//
//     });
//   }
//
//
//   // Block or unblock user
//   toggleUserStatus(user: User): void {
//
//     const action = user.active ? 'block' : 'unblock';
//
//     this.http.post(
//       `http://localhost:8080/api/user/${action}/${user.id}`,
//       {},
//       { withCredentials: true }
//     ).subscribe({
//
//       next: () => {
//         user.active = !user.active;
//       },
//
//       error: (error) => {
//         console.error('Error changing user status:', error);
//       }
//
//     });
//   }
//
//
//   // Logout
//   logout(): void {
//
//     this.http.post(
//       'http://localhost:8080/logout',
//       {},
//       {
//         withCredentials: true,
//         responseType: 'text'
//       }
//     ).subscribe({
//
//       next: () => {
//         this.router.navigate(['/login']);
//       },
//
//       error: (error) => {
//         console.error('Logout error:', error);
//       }
//
//     });
//   }
//
// }
