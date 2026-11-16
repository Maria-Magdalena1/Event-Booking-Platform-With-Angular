import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile {}

//import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
//
// interface User {
//   id: number;
//   username: string;
//   email: string;
//   name: string;
//   age: number;
// }
//
// @Component({
//   selector: 'app-edit-profile',
//   standalone: true,
//   imports: [FormsModule, RouterLink],
//   templateUrl: './edit-profile.html',
//   styleUrl: './edit-profile.css'
// })
// export class EditProfileComponent implements OnInit {
//
//   user: User | null = null;
//
//   errors: { [key: string]: string } = {};
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
//   // Load current user's profile
//   loadProfile(): void {
//
//     this.http.get<User>(
//       'http://localhost:8080/api/user/profile'
//     ).subscribe({
//
//       next: (data) => {
//         this.user = data;
//       },
//
//       error: (error) => {
//         console.error('Error loading profile:', error);
//       }
//
//     });
//   }
//
//   // Update profile
//   updateProfile(): void {
//
//     if (!this.user) {
//       return;
//     }
//
//     this.errors = {};
//
//     this.http.put(
//       'http://localhost:8080/user/profile/edit',
//       this.user
//     ).subscribe({
//
//       next: () => {
//         this.router.navigate(['/user/profile']);
//       },
//
//       error: (error) => {
//         console.error('Error updating profile:', error);
//
//         if (error.error?.errors) {
//           this.errors = error.error.errors;
//         }
//       }
//
//     });
//   }
// }
