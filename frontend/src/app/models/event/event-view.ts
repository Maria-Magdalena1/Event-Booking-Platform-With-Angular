import {Event} from './event';

export interface EventView extends Event {
  venue: string;
  location:string;
  price: number;
  canBook: boolean;
  canEditDelete: boolean;
}
