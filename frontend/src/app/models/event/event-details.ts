import {EditEvent} from './edit-event';

export interface EventDetails extends EditEvent{
  id:string;
  availableSeats:number;
  canBook:boolean;
}
