import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Booking } from '../models/booking/booking';
import { BookingConfirmationResponse } from '../models/booking/booking-confirmation-response';
import { ProfileBooking } from '../models/profile-booking';
import { BookingRequest } from '../models/booking/booking-request';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:8080/bookings';
// /analytics/dashboard
  constructor(private http: HttpClient) {}

  getMyBookings(): Observable<ProfileBooking[]> {
      return this.http.get<ProfileBooking[]>(`${this.apiUrl}/my-bookings`);
  }

  createBooking(eventId: string, request: BookingRequest): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/${eventId}`, request);
  }

  getBookingById(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`);
  }

  getBookingConfirmation(id: string): Observable<BookingConfirmationResponse> {
    return this.http.get<BookingConfirmationResponse>(
      `${this.apiUrl}/confirm/${id}`
    );
  }

  confirmBooking(id: string): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/confirm/${id}`, {});
  }

  cancelBooking(id: string): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/cancel/${id}`, {});
  }
}
