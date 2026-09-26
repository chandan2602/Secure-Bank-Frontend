import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly tokenKey = 'token';
  private readonly expiryKey = 'token_expires_at';
  private readonly fallbackExpiryMs = 30 * 60 * 1000;
  private expirationTimer: ReturnType<typeof setTimeout> | undefined;

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

  constructor() {
    this.restoreSession();
  }

  saveToken(token: string, expiresInSeconds?: number): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    const tokenExpiry = this.readJwtExpiry(token);
    const responseExpiry =
      Number.isFinite(expiresInSeconds) && expiresInSeconds! > 0
        ? Date.now() + expiresInSeconds! * 1000
        : undefined;
    const expiresAt = tokenExpiry ?? responseExpiry ?? Date.now() + this.fallbackExpiryMs;

    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.expiryKey, String(expiresAt));
    this.scheduleExpiration(expiresAt);
  }

  getToken(): string | null {
    if (!this.isLogedIn() || typeof localStorage === 'undefined') {
      return null;
    }

    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    if (this.expirationTimer !== undefined) {
      clearTimeout(this.expirationTimer);
      this.expirationTimer = undefined;
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.expiryKey);
    }
  }

  isLogedIn(): boolean {
    if (typeof localStorage === 'undefined') {
      return false;
    }

    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return false;
    }

    const storedExpiry = Number(localStorage.getItem(this.expiryKey));
    const expiresAt = storedExpiry || this.readJwtExpiry(token);
    if (!expiresAt || expiresAt <= Date.now()) {
      this.expireSession();
      return false;
    }

    if (!storedExpiry) {
      localStorage.setItem(this.expiryKey, String(expiresAt));
      this.scheduleExpiration(expiresAt);
    }

    return true;
  }

  private restoreSession(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return;
    }

    const storedExpiry = Number(localStorage.getItem(this.expiryKey));
    const expiresAt = storedExpiry || this.readJwtExpiry(token);
    if (!expiresAt || expiresAt <= Date.now()) {
      this.expireSession();
      return;
    }

    localStorage.setItem(this.expiryKey, String(expiresAt));
    this.scheduleExpiration(expiresAt);
  }

  private scheduleExpiration(expiresAt: number): void {
    if (this.expirationTimer !== undefined) {
      clearTimeout(this.expirationTimer);
    }

    const remainingMs = expiresAt - Date.now();
    if (remainingMs <= 0) {
      this.expireSession();
      return;
    }

    this.expirationTimer = setTimeout(() => {
      this.expireSession();
    }, remainingMs);
  }

  private expireSession(): void {
    this.logout();
    if (this.router.url !== '/login') {
      void this.router.navigate(['/login']);
    }
  }

  private readJwtExpiry(token: string): number | undefined {
    try {
      const payloadPart = token.split('.')[1];
      if (!payloadPart || typeof atob === 'undefined') {
        return undefined;
      }

      const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64)) as { exp?: unknown };
      return typeof payload.exp === 'number' ? payload.exp * 1000 : undefined;
    } catch {
      return undefined;
    }
  }
}
