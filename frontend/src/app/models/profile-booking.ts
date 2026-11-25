import { CreatedEventsProfile } from './event/created-events-profile';

export interface ProfileBooking {
  id: string;
  event: Pick<CreatedEventsProfile, 'name' | 'startDate' | 'endDate'>;
  bookedOn: string;
  seatsBooked: number;
  status: {
    name: string;
    displayName: string;
  };
}
