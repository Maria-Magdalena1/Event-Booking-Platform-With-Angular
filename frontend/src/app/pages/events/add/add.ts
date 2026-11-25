import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { form, FormField, FormRoot, required, min } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';

import { CreateEvent } from '../../../models/event/create-event';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [RouterLink, FormRoot, FormField],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add {
  eventRequest = signal<CreateEvent>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    venue: '',
    location: '',
    price: 0,
    totalSeats: 1,
  });

  errorMessage = signal('');
  successMessage = signal('');

  errors = signal<Record<string, string>>({});
  isGeneratingDescription = signal(false);

  eventForm = form(
    this.eventRequest,
    (path) => {
      required(path.name);
      required(path.startDate);
      required(path.endDate);
      required(path.venue);
      required(path.location);
      min(path.price, 0);
      min(path.totalSeats, 1);
    },
    {
      submission: {
        action: async (field) => {
          this.errorMessage.set('');
          this.errors.set({});

          const newEvent = field().value();

          try {
            const response = await firstValueFrom(this.eventService.addEvent(newEvent));
            console.log('Event added successfully!', response);

            await this.router.navigate(['/events']);

            return undefined;
          } catch (error) {
            console.error('Error adding event:', error);

            const message =
              error instanceof HttpErrorResponse
                ? error.error?.message || 'Failed to add event.'
                : 'Failed to add event.';

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
    private router: Router,
    private eventService: EventService,
  ) {}

  async generateDescription(): Promise<void> {
    const title = this.eventRequest().name.trim();

    if (!title) {
      return;
    }

    this.isGeneratingDescription.set(true);
    this.errorMessage.set('');

    try {
      const data = await firstValueFrom(this.eventService.generateDescription(title));

      this.eventRequest.update((event) => ({
        ...event,
        description: data.description,
      }));
    } catch (error) {
      console.error('Could not generate description:', error);
      this.errorMessage.set('Failed to generate description. Try again.');
    } finally {
      this.isGeneratingDescription.set(false);
    }
  }
}
