import { Booking } from './booking';

export interface BookingConfirmation extends Pick<Booking, 'id' | 'seatsBooked'> {
  event: Pick<Booking['event'], 'name'>;
  status: Pick<Booking['status'], 'displayName'>;
  qrCodeBase64: string;
}
