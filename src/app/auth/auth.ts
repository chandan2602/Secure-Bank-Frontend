import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(HttpClient);

  login(email: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    //  URLSearchParams is a JavaScript class that helps you create key-value pairs in a format that many servers expect.

    body.set('username', email);
    body.set('password', password); // these two pass the the values in the login form

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(`${environment.apiUrl}/registration/login`, body.toString(), { headers });
    // we pass the body.toString() because it will convert email=john@gmail.com&password=123456
    // This is called URL-encoded form data.
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedin(): boolean {
    // return !!this.getToken()   this is for experienced do the same job convert string value to bool
    // return this.getToken !== null // we  can write this also
    const token = this.getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
