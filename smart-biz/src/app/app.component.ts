import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SmartBiz';

  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get isEmployee(): boolean {
    return this.authService.isEmployee();
  }

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}