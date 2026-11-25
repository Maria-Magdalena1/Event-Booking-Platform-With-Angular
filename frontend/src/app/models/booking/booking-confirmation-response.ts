import { BookingConfirmation } from './booking-confirmation';

export interface BookingConfirmationResponse extends BookingConfirmation {
  booking: BookingConfirmation;
  message: string;
  pdfFileName: string;
  googleCalendarLink: string;
}
