import {Event} from './event';

export interface EditEvent extends Pick<Event, 'name'> {
  description: string;
  venue: string;
  location: string;
  price: number;
  startDate: string;
  endDate: string;
}
