import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
})
export class Confirmation {
  confirmBooking(): void {
    // Ще изпратим POST заявка към Spring Boot
    console.log('Confirm booking clicked');
  }

  cancelBooking(): void {
    // Ще изпратим POST заявка към Spring Boot
    console.log('Cancel booking clicked');
  }
}
