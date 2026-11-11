import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {EventService} from '../../services/event.service';
import {Event} from '../../models/event';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  events: Event[] = [];

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (error) => {
        console.error('Error loading events: ', error);
      }
    });
  }
}

