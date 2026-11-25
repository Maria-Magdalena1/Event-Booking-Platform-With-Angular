import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { User } from '../../../models/user/user';
import { CreatedEventsProfile } from '../../../models/event/created-events-profile';

import { UserService } from '../../../services/user.service';
import { EventService } from '../../../services/event.service';
import { BookingService } from '../../../services/booking.service';
import { AuthService } from '../../../services/auth.service';
import { ProfileBooking } from '../../../models/profile-booking';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  user = signal<User | null>(null);

  isAdmin = signal(false);

  allUsers = signal<User[]>([]);

  createdEvents = signal<CreatedEventsProfile[]>([]);

  bookings = signal<ProfileBooking[]>([]);

  errorMessage = signal('');

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

  // /analytics/dashboard
  loadProfile(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.user.set(user);
        this.isAdmin.set(user.role === 'ADMIN');

        this.loadCreatedEvents();
        this.loadBookings();

        if (this.isAdmin()) {
          this.loadAllUsers();
        }
      },
      error: (error) => {
        this.errorMessage.set('Could not load profile.');
        console.error(error);
      },
    });
  }

  loadCreatedEvents(): void {
    this.eventService.getMyCreatedEvents().subscribe({
      next: (events) => {
        this.createdEvents.set(events);
      },
      error: (error) => {
        console.error('Could not load created events.', error);
      },
    });
  }
  loadBookings(): void {
    this.bookingService.getMyBookings().subscribe({
      next: (bookings) => {
        this.bookings.set(bookings);
      },
      error: (error) => {
        console.error('Could not load bookings.', error);
      },
    });
  }

  loadAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.allUsers.set(
          users.filter((user) => user.id !== this.user()?.id));
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
        //  /
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed.', error);
      },
    });
  }
}
