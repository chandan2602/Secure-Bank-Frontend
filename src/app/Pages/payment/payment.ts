import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
@Component({
  selector: 'app-payment',
  imports: [Sidebar],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {}
