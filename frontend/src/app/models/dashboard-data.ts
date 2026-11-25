export interface DashboardData {
  totalUsers:number;
  totalEvents:number;
  totalBookings:number;
  totalRevenue:number;
  topEvents:{
    name:string;
    totalSeatsBooked:number;
  }[];

  seatWarnings: {
    eventName:string;
    freeSeats:number;
  }[];
}
