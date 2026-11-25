import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { BookingConfirmationResponse } from '../../../models/booking/booking-confirmation-response';
import { BookingService } from '../../../services/booking.service';
import { BookingConfirmation } from '../../../models/booking/booking-confirmation';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './status.html',
  styleUrl: './status.css',
})
export class Status implements OnInit {
  booking = signal<BookingConfirmation | null>(null);

  message = signal('');
  errorMessage = signal('');

  pdfFileName = signal('');
  googleCalendarLink = signal('');

  private bookingId = '';

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
  ) {}

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.paramMap.get('id') || '';

    if (this.bookingId) {
      this.loadBooking();
    } else {
      this.errorMessage.set('Invalid booking ID.');
    }
  }

  async loadBooking(): Promise<void> {
    try {
      const response: BookingConfirmationResponse = await firstValueFrom(
        this.bookingService.getBookingConfirmation(this.bookingId),
      );

      this.booking.set(response.booking);
      this.message.set(response.message);
      this.pdfFileName.set(response.pdfFileName);
      this.googleCalendarLink.set(response.googleCalendarLink);
    } catch (error) {
      console.error('Could not load booking:', error);

      const message =
        error instanceof HttpErrorResponse
          ? error.error?.message || 'Could not load booking details.'
          : 'Could not load booking details.';

      this.errorMessage.set(message);
    }
  }
}
