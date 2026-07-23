import { Component, inject, OnInit } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TransationsServices } from '../../Services/transations';

@Component({
  selector: 'app-transation',
  imports: [Sidebar, CommonModule],
  templateUrl: './transation.html',
  styleUrl: './transation.css',
})
export class Transation implements OnInit {
  http = inject(HttpClient);

  serv = inject(TransationsServices);

  transation: any[] = [];

  ngOnInit() {
    this.ontransation();
  }

  ontransation() {
    this.serv.onTransationService().subscribe({
      next: (res) => {
        this.transation = res;
        console.log(this.transation);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
