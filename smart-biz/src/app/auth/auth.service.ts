import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { username: 'admin', password: 'admin123', role: 'Admin' },
    { username: 'ravi', password: 'ravi123', role: 'Employee' },
    { username: 'sita', password: 'sita123', role: 'Employee' }
  ];

  private currentUser: User | null = null;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.currentUser = JSON.parse(user);
      }
    }
    return this.currentUser;
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'Admin';
  }

  isEmployee(): boolean {
    return this.getCurrentUser()?.role === 'Employee';
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}