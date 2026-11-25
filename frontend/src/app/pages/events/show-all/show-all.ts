import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EventView } from '../../../models/event/event-view';
import { EventService } from '../../../services/event.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-show-all',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './show-all.html',
  styleUrl: './show-all.css',
})
export class ShowAll implements OnInit {
  events = signal<EventView[]>([]);

  successMessage = signal('');
  errorMessage = signal('');

  constructor(
    private eventService: EventService,
    private authService: AuthService,
  ) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.events.set(events);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage.set('Could not load events.');
        console.error('Could not load events.', error);
      },
    });
  }
  deleteEvent(id: string): void {
    this.eventService.deleteEvent(id).subscribe({
      next: () => {
        this.events.update(events => events.filter(event => event.id !== id));

        this.successMessage.set('Event deleted successfully.');
        this.errorMessage.set('');
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage.set(error.error?.message || 'Could not delete event.');
        this.successMessage.set('');
        console.error('Could not delete event.', error);
      },
    });
  }
}
