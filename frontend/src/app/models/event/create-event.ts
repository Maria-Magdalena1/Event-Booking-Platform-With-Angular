import { Event } from './event';

export interface CreateEvent extends Pick<Event, 'name'> {
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
  location: string;
  price: number;
  totalSeats: number;
}
