import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn:'root'
})

export class EventService {

  private apiUrl='http://localhost:8080/events';

  constructor(private http: HttpClient) { }

  getAllEvents():Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }
}
