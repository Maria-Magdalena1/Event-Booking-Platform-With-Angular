import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CreatedEventsProfile } from '../models/event/created-events-profile';
import { EventView } from '../models/event/event-view';
import { EditEvent } from '../models/event/edit-event';
import { CreateEvent } from '../models/event/create-event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:8080/events';
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  //events/add-event
  addEvent(event: CreateEvent): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/add-event`, event);
  }

  getAllEvents(): Observable<EventView[]> {
    return this.http.get<EventView[]>(this.apiUrl);
  }

  //events/id
  getMyCreatedEvents(): Observable<CreatedEventsProfile[]> {
    return this.http.get<CreatedEventsProfile[]>(`${this.apiUrl}/my-events`);
  }

  //pak vsichko
  getEventById<T>(id: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  //tuk shte ni trqbva event s vsichko
  //id name description,startdate,enddate,venue,location,price,totalseats,availableseats
  //creator,canbook,caneditdelete
  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }
  //id name description,startdate,enddate,venue,location,price,totalseats,availableseats
  updateEvent(id: string, event: EditEvent): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  generateDescription(title: string): Observable<{ description: string }> {
    return this.http.get<{ description: string }>(`${this.baseUrl}/ai/description`, {
      params: { title },
    });
  }
}
