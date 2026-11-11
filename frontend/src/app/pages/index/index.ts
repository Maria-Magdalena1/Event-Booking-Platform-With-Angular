import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {

  constructor(
    public authService: AuthService
  ) {}
  //    ^
  //    |
  //should it be public and shoould we remove the getter, or should it be private

  //get isAuthenticated():boolean {
    //return this.authService.isAuthenticated;
  //}
}
