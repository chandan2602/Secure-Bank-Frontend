import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Navbar } from './Components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {

  constructor(private router: Router) {}
  http = inject(HttpClient);

  user: any[] = [];

  ngOnInit(): void {
    this.usercomment();
  }
  usercomment() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/comments').subscribe((data) => {
      this.user = data;
      // console.log(this.user);
    });
  }
}
