import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})

export class Admin {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
