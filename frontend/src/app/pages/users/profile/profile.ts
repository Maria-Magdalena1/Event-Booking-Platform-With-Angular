import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { User } from '../../../models/profile/user';
import { Event } from '../../../models/profile/event';
import { Booking } from '../../../models/profile/booking';

import { UserService } from '../../../services/user.service';
import { EventService } from '../../../services/event.service';
import { BookingService } from '../../../services/booking.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})

export class Profile implements OnInit {
  user!: User;
  isAdmin = false;

  allUsers: User[] = [];
  createdEvents: Event[] = [];
  bookings: Booking[] = [];

  errorMessage = '';

  constructor(
    private userService: UserService,
    private eventService: EventService,
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
        this.isAdmin = user.role === 'ADMIN';

        this.loadCreatedEvents();
        this.loadBookings();

        if (this.isAdmin) {
          this.loadAllUsers();
        }
      },
      error: (error) => {
        this.errorMessage = 'Could not load profile.';
        console.error(error);
      },
    });
  }

  loadCreatedEvents(): void {
    this.eventService.getMyCreatedEvents().subscribe({
      next: (events) => {
        this.createdEvents = events;
      },
      error: (error) => {
        console.error('Could not load created events.', error);
      },
    });
  }
  loadBookings(): void {
    this.bookingService.getMyBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
      },
      error: (error) => {
        console.error('Could not load bookings.', error);
      },
    });
  }

  loadAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.allUsers = users.filter((user) => user.id !== this.user.id);
      },
      error: (error) => {
        console.error('Could not load users.', error);
      },
    });
  }

  toggleUserStatus(user: User): void {
    this.userService.toggleBlockUser(user.id).subscribe({
      next: () => {
        user.active = !user.active;
      },
      error: (error) => {
        console.error('Could not update user status.', error);
      },
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed.', error);
      },
    });
  }
}
