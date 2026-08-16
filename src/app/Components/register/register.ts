import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register  {

  router = inject(Router);
  snackbar = inject(MatSnackBar);
  authService = inject(Auth)

  // ngOnInit() {
  //   this.registerUser();
  // }

  registerUser() {
    this.authService.Registration().subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
        this.snackbar.open('Login Sucessful', 'close', { duration: 3000 });
        return response
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
