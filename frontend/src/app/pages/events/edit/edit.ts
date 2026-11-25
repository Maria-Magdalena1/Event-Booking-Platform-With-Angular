import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { form, FormField, FormRoot, required, min } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { EditEvent } from '../../../models/event/edit-event';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterLink, FormField, FormRoot],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit implements OnInit {
  event = signal<EditEvent | null>(null);

  errorMessage = signal('');
  errors = signal<Record<string, string>>({});

  eventRequest = signal<EditEvent>({
    name: '',
    description: '',
    venue: '',
    location: '',
    price: 0,
    startDate: '',
    endDate: '',
  });

  private eventId = '';

  eventForm = form(
    this.eventRequest,
    (path) => {
      required(path.name);
      required(path.description);
      required(path.venue);
      required(path.location);
      required(path.startDate);
      required(path.endDate);

      min(path.price, 0);
    },
    {
      submission: {
        action: async (field) => {
          this.errorMessage.set('');
          this.errors.set({});

          const updatedEvent = field().value();

          try {
            const response = await firstValueFrom(
              this.eventService.updateEvent(this.eventId, updatedEvent),
            );

            console.log('Event updated successfully!', response);

            await this.router.navigate(['/events']);

            return undefined;
          } catch (error) {
            console.error('Error updating event:', error);

            const message =
              error instanceof HttpErrorResponse
                ? error.error?.message || 'Could not update event.'
                : 'Could not update event.';

            this.errorMessage.set(message);

            if (error instanceof HttpErrorResponse && error.error?.errors) {
              this.errors.set(error.error.errors);
            }

            return {
              kind: 'serverError',
              message,
            };
          }
        },
      },
    },
  );

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id') || '';

    if (this.eventId) {
      this.loadEvent();
    } else {
      this.errorMessage.set('Invalid event ID.');
    }
  }

  async loadEvent(): Promise<void> {
    try {
      const loadedEvent = await firstValueFrom<EditEvent>(this.eventService.getEventById(this.eventId));

      const eventData: EditEvent = {
        name: loadedEvent.name,
        description: loadedEvent.description,
        venue: loadedEvent.venue,
        location: loadedEvent.location,
        price: loadedEvent.price,
        startDate: loadedEvent.startDate?.slice(0, 16) || '',
        endDate: loadedEvent.endDate?.slice(0, 16) || '',
      };

      this.eventRequest.set(eventData);
      this.event.set(eventData);
    } catch (error) {
      console.error('Could not load event:', error);
      this.errorMessage.set('Could not load event.');
    }
  }
}
