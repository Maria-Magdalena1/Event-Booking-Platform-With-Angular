import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { form, FormRoot, FormField, min } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';

import {BookingEvent} from '../../../models/event/booking-event';
import { Booking } from '../../../models/booking/booking';
import { BookingRequest } from '../../../models/booking/booking-request';

import { EventService } from '../../../services/event.service';
import { BookingService } from '../../../services/booking.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [RouterLink, FormRoot, FormField],
  templateUrl: './form.html',
  styleUrl: '../../../shared/event-form.css',
})
export class Form implements OnInit {
  event = signal<BookingEvent | null>(null);

  bookingRequest = signal<BookingRequest>({
    seatsBooked: 1,
  });

  errorMessage = signal('');

  backUrl = '/events';

  private eventId = '';

  bookingForm = form(
    this.bookingRequest,
    (path) => {
      min(path.seatsBooked, 1);
    },
    {
      submission: {
        action: async (field) => {
          this.errorMessage.set('');

          const currentEvent = this.event();

          if (!currentEvent) {
            const message = 'Event is not available.';
            this.errorMessage.set(message);

            return {
              kind: 'serverError',
              message,
            };
          }
          const request = field().value();

          if (request.seatsBooked > currentEvent.availableSeats) {
            const message = `Only ${currentEvent.availableSeats} seats are available.`;

            this.errorMessage.set(message);

            return {
              kind: 'serverError',
              message,
            };
          }

          try {
            const booking: Booking = await firstValueFrom(
              this.bookingService.createBooking(this.eventId, request),
            );

            console.log('Booking created successfully!', booking);

            await this.router.navigate(['/bookings', booking.id]);

            return undefined;
          } catch (error) {
            console.error('Could not create booking:', error);

            const message =
              error instanceof HttpErrorResponse
                ? error.error?.message || 'Could not create booking.'
                : 'Could not create booking.';

            this.errorMessage.set(message);

            return {
              kind: 'serverError',
              message,
            };
          }
        },
      },
    },
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private bookingService: BookingService,
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId') || '';

    const from = this.route.snapshot.queryParamMap.get('from');

    if (from?.startsWith('/')) {
      this.backUrl = from;
    }

    if (this.eventId) {
      void this.loadEvent();
    } else {
      this.errorMessage.set('Invalid event ID.');
    }
  }
  async loadEvent(): Promise<void> {
    try {
      const event = await firstValueFrom(this.eventService.getEventById<BookingEvent>(this.eventId));

      this.event.set(event);
    } catch (error) {
      console.error('Could not load event:', error);

      const message =
        error instanceof HttpErrorResponse
          ? error.error?.message || 'Could not load event.'
          : 'Could not load event.';

      this.errorMessage.set(message);
    }
  }
}
