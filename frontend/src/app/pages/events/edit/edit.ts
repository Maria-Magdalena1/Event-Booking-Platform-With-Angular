import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit',
  imports: [FormsModule, RouterLink],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit {
  protected readonly event = event;
}

//import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { ActivatedRoute, Router, RouterLink } from '@angular/router';
//
// interface Event {
//   id: number;
//   name: string;
//   description: string;
//   venue: string;
//   location: string;
//   price: number;
//   startDate: string;
//   endDate: string;
// }
//
// @Component({
//   selector: 'app-edit-event',
//   standalone: true,
//   imports: [FormsModule, RouterLink],
//   templateUrl: './edit-event.html',
//   styleUrl: './edit-event.css'
// })
// export class EditEventComponent implements OnInit {
//
//   event: Event | null = null;
//
//   errors: { [key: string]: string } = {};
//
//   constructor(
//     private http: HttpClient,
//     private route: ActivatedRoute,
//     private router: Router
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
//   // Load event
//   loadEvent(id: number): void {
//
//     this.http.get<Event>(
//       `http://localhost:8080/api/events/${id}`
//     ).subscribe({
//
//       next: (data) => {
//         this.event = {
//           ...data,
//           startDate: data.startDate.substring(0, 16),
//           endDate: data.endDate.substring(0, 16)
//         };
//       },
//
//       error: (error) => {
//         console.error('Error loading event:', error);
//       }
//     });
//   }
//
//   // Update event
//   updateEvent(): void {
//
//     if (!this.event) {
//       return;
//     }
//
//     this.errors = {};
//
//     this.http.put(
//       `http://localhost:8080/events/${this.event.id}/event-edit`,
//       this.event
//     ).subscribe({
//
//       next: () => {
//         this.router.navigate(['/events']);
//       },
//
//       error: (error) => {
//         console.error('Error updating event:', error);
//
//         if (error.error?.errors) {
//           this.errors = error.error.errors;
//         }
//       }
//     });
//   }
// }
