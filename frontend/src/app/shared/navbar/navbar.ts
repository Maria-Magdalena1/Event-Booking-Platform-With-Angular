import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  isAuthenticated = false;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isAuthenticated=this.authService.isAuthenticated();
  }

  logout():void {
    this.authService.logout().subscribe({
      next:()=>{
        this.isAuthenticated=false;
        this.router.navigate(['/login']);
      },error:(error)=>{
        console.error('Logout failed.',error);
      }
    })
  }
}
