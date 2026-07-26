import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';


@Component({
  selector: 'app-settings',
  imports: [Sidebar],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {}
