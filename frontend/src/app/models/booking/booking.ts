export interface Booking {
  id: string;
  event: {
    name:string;
  };
  bookedOn: string;
  seatsBooked: number;
  status: {
    name: string;
    displayName: string;
  };
}
