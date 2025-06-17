import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;
  passwordVisible = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.errorMessage = '';
    
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.isLoading = true;
    
    if (this.authService.login(this.username, this.password)) {
      const user = this.authService.getCurrentUser();
      if (user?.role === 'Admin') {
        this.router.navigate(['/admin/dashboard']);
      } else if (user?.role === 'Employee') {
        this.router.navigate(['/employee/dashboard']);
      }
    } else {
      this.errorMessage = 'Invalid username or password';
    }
    
    this.isLoading = false;
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}