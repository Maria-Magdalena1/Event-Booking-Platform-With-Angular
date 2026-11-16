import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [
    RouterLink
  ],
  templateUrl: './details.html',
  styleUrl: '../../../shared/event-form.css',
})
export class Details {
  protected readonly event = event;
}

//import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { ActivatedRoute, RouterLink } from '@angular/router';
// import { DatePipe } from '@angular/common';
//
// interface Event {
//   id: number;
//   name: string;
//   description: string;
//   venue: string;
//   location: string;
//   startDate: string;
//   endDate: string;
//   price: number;
//   availableSeats: number;
//   canBook: boolean;
// }
//
// @Component({
//   selector: 'app-details',
//   standalone: true,
//   imports: [RouterLink, DatePipe],
//   templateUrl: './details.html',
//   styleUrl: './details.css'
// })
// export class DetailsComponent implements OnInit {
//
//   event: Event | null = null;
//
//   constructor(
//     private http: HttpClient,
//     private route: ActivatedRoute
//   ) {}
//
//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//
//     if (id) {
//       this.loadEvent(Number(id));
//     }
//   }
//
//   loadEvent(id: number): void {
//
//     this.http.get<Event>(
//       `http://localhost:8080/api/events/${id}`
//     ).subscribe({
//
//       next: (data) => {
//         this.event = data;
//       },
//
//       error: (error) => {
//         console.error('Error loading event:', error);
//       }
//
//     });
//   }
// }
