import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { Navbar } from './Components/navbar/navbar';
import { Auth } from './auth/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);
  private readonly auth = inject(Auth);

  readonly showNavbar = signal(false);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.syncAppChrome());
  }

  private syncAppChrome(): void {
    const currentPath = this.router.url.split(/[?#]/, 1)[0];
    const publicRoutes = ['/', '/landing-page', '/login', '/register'];
    const isAuthenticated = typeof localStorage !== 'undefined' && !!this.auth.getToken();

    this.showNavbar.set(isAuthenticated && !publicRoutes.includes(currentPath));
  }
}
