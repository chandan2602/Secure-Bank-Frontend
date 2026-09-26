import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashbordService } from '../../Services/dashbord';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private readonly router = inject(Router);
  private readonly auth = inject(Auth);
  private readonly profileService = inject(DashbordService);

  readonly memberName = this.profileService.profileName;

  ngOnInit(): void {
    this.profileService.getprofile().subscribe({
      error: (error) => console.error('Could not load member profile:', error),
    });
  }

  logout(): void {
    this.auth.logout();
    void this.router.navigate(['/login']);
  }
}
