import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  http = inject(HttpClient);

  ngOnInit() {
    this.registerUser();
  }
  registerobj = {
  "full_name": "",
  "mobile_number": "",
  "email": "",
  "user_name": "",
  "user_password": ""
}
  registerUser() {
    this.http.post('http://127.0.0.1:8000/user_registration', this.registerobj).subscribe({
      next: (response) => {
        console.log("user created")
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
