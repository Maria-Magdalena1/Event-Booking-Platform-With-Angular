import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { EventDetails } from '../../../models/event/event-details';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './details.html',
  styleUrl: '../../../shared/event-form.css',
})
export class Details implements OnInit {
  event = signal<EventDetails | null>(null);
  errorMessage = signal('');

  private eventId = '';

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['id'];

    if (this.eventId) {
      this.loadEvent();
    } else {
      this.errorMessage.set('Invalid event ID.');
    }
  }

  async loadEvent(): Promise<void> {
    try {
      const event = await firstValueFrom(
        this.eventService.getEventById<EventDetails>(this.eventId),
      );

      this.event.set(event);
    } catch (error) {
      console.error('Could not load event:', error);

      const message =
        error instanceof HttpErrorResponse
          ? error.error?.message || 'Could not load event details.'
          : 'Could not load event details.';

      this.errorMessage.set(message);
    }
  }
}
