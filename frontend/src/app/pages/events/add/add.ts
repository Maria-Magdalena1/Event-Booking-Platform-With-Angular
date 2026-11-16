import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add',
  imports: [RouterLink, FormsModule],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add {}
