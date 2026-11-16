import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-show-all',
  imports: [RouterLink],
  templateUrl: './show-all.html',
  styleUrl: './show-all.css',
})
export class ShowAll {}

//import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { RouterLink } from '@angular/router';
//
// interface Event {
//   id: number;
//   name: string;
//   venue: string;
//   location: string;
//   price: number;
//   availableSeats: number;
//   canBook: boolean;
//   canEditDelete: boolean;
// }
//
// @Component({
//   selector: 'app-show-all',
//   standalone: true,
//   imports: [RouterLink],
//   templateUrl: './show-all.html',
//   styleUrl: './show-all.css'
// })
// export class ShowAllComponent implements OnInit {
//
//   events: Event[] = [];
//
//   successMessage = '';
//   errorMessage = '';
//
//   isAuthenticated = false;
//
//   constructor(private http: HttpClient) {}
//
//   ngOnInit(): void {
//     this.loadEvents();
//   }
//
//   // Load all events
//   loadEvents(): void {
//
//     this.http.get<Event[]>(
//       'http://localhost:8080/api/events'
//     ).subscribe({
//
//       next: (data) => {
//         this.events = data;
//       },
//
//       error: (error) => {
//         console.error('Error loading events:', error);
//         this.errorMessage = 'Failed to load events.';
//       }
//
//     });
//   }
//
//   // Delete event
//   deleteEvent(id: number): void {
//
//     const confirmed = confirm(
//       'Are you sure you want to delete this event?'
//     );
//
//     if (!confirmed) {
//       return;
//     }
//
//     this.http.delete(
//       `http://localhost:8080/events/${id}/delete`
//     ).subscribe({
//
//       next: () => {
//         this.successMessage = 'Event deleted successfully!';
//
//         this.loadEvents();
//       },
//
//       error: (error) => {
//         console.error('Error deleting event:', error);
//         this.errorMessage = 'Failed to delete event.';
//       }
//
//     });
//   }
// }
