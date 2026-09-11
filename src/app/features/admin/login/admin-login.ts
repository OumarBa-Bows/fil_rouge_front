import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss'
})
export class AdminLoginComponent {
  constructor(private router: Router) {}

  login(event: Event) {
    event.preventDefault();
    // Simulate login success and redirect to admin dashboard
    this.router.navigate(['/admin/products']);
  }
}
