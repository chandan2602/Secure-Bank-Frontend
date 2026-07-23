import { Component,inject } from '@angular/core';
import { RouterLink,Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  router = inject(Router);

   logout() {
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }
}
