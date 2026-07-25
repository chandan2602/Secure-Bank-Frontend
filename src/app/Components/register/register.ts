import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  http = inject(HttpClient);
  baseUrl = environment.apiUrl

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
    this.http.post(`${this.baseUrl}/user_registration`, this.registerobj).subscribe({
      next: (response) => {
        console.log("user created",response)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
