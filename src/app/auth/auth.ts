import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(HttpClient);

  baseUrl = `${environment.apiUrl}/registration`;

  RegistrationPayload = {
    full_name: '',
    email: '',
    mobile_number: '',
    user_name: '',
    user_password: '',
  };

  LoginPayload = {
    email: '',
    password: '',
  };

  Registration(): Observable<any> {
    return this.http.post(`${this.baseUrl}/user_registration`, this.RegistrationPayload);
  }

  Login(): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, this.LoginPayload);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLogedIn(): Boolean {
    return !!this.getToken();
  }
}
