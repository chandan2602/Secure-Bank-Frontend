import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../auth/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  router = inject(Router);
  authService = inject(Auth);
  snackbar = inject (MatSnackBar)

  loginPayload = {
    email: '',
    password: '',
  };

  OnLogin() {
    this.authService.login(this.loginPayload.email, this.loginPayload.password).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/dashboard']);
        this.snackbar.open('Login Sucessful','close' ,{duration:3000})
      },
      error: (err) => {
        console.log(err);
        this.snackbar.open('Invalid Credential','close', {duration : 3000})
      },
    });
  }

 
}
