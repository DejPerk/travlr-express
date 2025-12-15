import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.html'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  error = '';

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.credentials).subscribe({
  next: (ok) => {
    if (ok) {
      this.error = '';
      window.location.href = '/';
    } else {
      this.error = 'Login failed';
    }
  },
  error: (err) => {
    this.error = err?.error?.message || 'Login failed';
   }
  });
} 
}
}