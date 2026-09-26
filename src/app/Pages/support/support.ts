import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Supportservice } from '../../Services/support';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-support',
  imports: [Sidebar, CommonModule, FormsModule],
  templateUrl: './support.html',
  styleUrl: './support.css',
})
export class Support implements OnInit {
  serv = inject(Supportservice);
  cdr = inject(ChangeDetectorRef);


  support: any[] = [];
  errorMsg: string = '';

  ngOnInit(): void {
    this.ongetsubmit();
  }

  onsubmit() {
    this.serv.onAddUserSupport().subscribe({
      next: (res: any) => {
        this.ongetsubmit(); // refresh table after submit
        return res;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ongetsubmit() {
    this.errorMsg = '';
    this.serv.ongetsupport().subscribe({
      next: (res: any) => {
        console.log('Support API response:', res);
        this.support = res;
        this.cdr.detectChanges()
      },
      error: (error) => {
        console.error('Support API error:', error);
        this.errorMsg = `Error ${error.status}: ${error.message}`;
      },
    });
  }
}
