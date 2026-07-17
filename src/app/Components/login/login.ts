import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = '';
  password: string = '';
  isLoggedIn = false;
  isshow: boolean = false;
  inputType: string = 'password';
  constructor(private router: Router) {}
  OnLogin() {
    if (this.username === 'chandankumar' && this.password === '123456') {
      alert('Login successfull');
      this.router.navigate(['/dashboard']).then((success) => {
        if (!success) {
          console.error('Navigation failed');
        }
      });
    } else {
      alert('invalid Username and password');
    }
  }

  OnLogout() {}

  ondisplay() {
    this.isshow = !this.isshow;
    if (this.isshow) {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }
}
