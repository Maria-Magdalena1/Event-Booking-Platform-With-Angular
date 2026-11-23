import { Component, OnInit, signal } from '@angular/core';
import { Location } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  totalUsers = signal(0);
  totalEvents = signal(0);
  totalBookings = signal(0);
  totalRevenue = signal(0);

  topEvents = signal<
    {
      name: string;
      totalSeatsBooked: number;
    }[]
  >([]);

  seatWarnings = signal<
    {
      eventName: string;
      freeSeats: number;
    }[]
  >([]);

  constructor(private location: Location,
              private analyticsService: AnalyticsService,) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.analyticsService.getDashboard().subscribe({
      next: (data) => {
        this.totalUsers.set(data.totalUsers);
        this.totalEvents.set(data.totalEvents);
        this.totalBookings.set(data.totalBookings);
        this.totalRevenue.set(data.totalRevenue);

        this.topEvents.set(data.topEvents);
        this.seatWarnings.set(data.seatWarnings);
      },
      error: (error) => {
        console.error('Could not load dashboard.', error);
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
