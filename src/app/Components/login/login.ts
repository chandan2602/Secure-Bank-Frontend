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
  snackbar = inject(MatSnackBar);

  loginPayload = {
    email: '',
    password: '',
  };

  private readExpirySeconds(response: unknown): number | undefined {
    if (typeof response !== 'object' || response === null || !('expires_in' in response)) {
      return undefined;
    }

    const expiresIn = response.expires_in;
    return typeof expiresIn === 'number' ? expiresIn : undefined;
  }

  OnLogin() {
    this.authService.Login().subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.access_token, this.readExpirySeconds(res));
        this.router.navigate(['/dashboard']);
        this.snackbar.open('Login Sucessful', 'close', { duration: 3000 });
        return res;
      },
      error: (err) => {
        console.log(err);
        this.snackbar.open('Invalid Credential', 'close', { duration: 3000 });
      },
    });
  }
}
