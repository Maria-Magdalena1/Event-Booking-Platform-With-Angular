import {Event} from './event';

export interface CreatedEventsProfile extends Event {
  startDate: string;
  endDate: string;
  totalSeats: number;
}
