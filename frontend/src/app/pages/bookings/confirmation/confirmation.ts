import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { Booking } from '../../../models/booking/booking';
import { BookingService } from '../../../services/booking.service';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
})
export class Confirmation implements OnInit {
  booking = signal<Booking | null>(null);

  errorMessage = signal('');
  isProcessing = signal(false);

  private bookingId = '';

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.bookingId = this.route.snapshot.paramMap.get('id') || '';

    if (this.bookingId) {
      await this.loadBooking();
    } else {
      this.errorMessage.set('Invalid booking ID.');
    }
  }

  async loadBooking(): Promise<void> {
    try {
      const booking = await firstValueFrom(this.bookingService.getBookingById(this.bookingId));

      this.booking.set(booking);
    } catch (error) {
      console.error('Could not load booking:', error);

      const message =
        error instanceof HttpErrorResponse
          ? error.error?.message || 'Could not load booking.'
          : 'Could not load booking.';

      this.errorMessage.set(message);
    }
  }
  async confirmBooking(): Promise<void> {
    await this.updateBookingStatus('confirm');
  }

  async cancelBooking(): Promise<void> {
    await this.updateBookingStatus('cancel');
  }

  private async updateBookingStatus(action: 'confirm' | 'cancel'): Promise<void> {
    this.errorMessage.set('');
    this.isProcessing.set(true);
    try {
      const updatedBooking =
        action === 'confirm'
          ? await firstValueFrom(this.bookingService.confirmBooking(this.bookingId))
          : await firstValueFrom(this.bookingService.cancelBooking(this.bookingId));

      this.booking.set(updatedBooking);
    } catch (error) {
      console.error(`Could not ${action} booking:`, error);

      const message =
        error instanceof HttpErrorResponse
          ? error.error?.message || `Could not ${action} booking.`
          : `Could not ${action} booking.`;

      this.errorMessage.set(message);
    } finally {
      this.isProcessing.set(false);
    }
  }
}
