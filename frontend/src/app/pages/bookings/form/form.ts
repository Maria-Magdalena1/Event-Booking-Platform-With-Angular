import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './form.html',
  styleUrl: '../../../shared/event-form.css',
})
export class Form {
  //event = {
  //     id: 1,
  //     name: 'Event Name',
  //     description: 'Event Description',
  //     availableSeats: 100
  //   };
  //
  //   seatsBooked = 1;
  //
  //   seatError = '';
  //   seatsError = '';
  //
  //   backUrl = '/events';
  //
  //   createBooking(): void {
  //     this.seatError = '';
  //     this.seatsError = '';
  //
  //     if (this.seatsBooked < 1) {
  //       this.seatsError = 'You must book at least one seat.';
  //       return;
  //     }
  //
  //     if (this.seatsBooked > this.event.availableSeats) {
  //       this.seatError = 'Not enough available seats.';
  //       return;
  //     }
  //
  //     console.log('Event ID:', this.event.id);
  //     console.log('Seats booked:', this.seatsBooked);
  //
  //     // Тук по-късно ще извикаме BookingService,
  //     // който ще изпрати заявка към Spring Boot.
  //   }
}
