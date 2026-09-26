import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { SupportRequest, SupportResponse, Supportservice } from '../../Services/support';
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

  support: SupportRequest[] = [];
  errorMsg: string = '';

  current_page = 1;
  page_size = 10;

  total_page: number = 0;
  total_record: number = 0;

  search: string = '';

  ngOnInit(): void {
    this.ongetsubmit();
  }

  onsubmit() {
    this.serv.onAddUserSupport().subscribe({
      next: (res: any) => {
        this.current_page = 1;
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
    this.serv.ongetsupport(this.current_page, this.page_size, this.search).subscribe({
      next: (res: SupportResponse) => {
        console.log('Support API response:', res);
        this.current_page = res.page;
        this.page_size = res.limit;
        this.total_page = res.Total_pages;
        this.total_record = res.total_record;
        this.support = res.all_support;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Support API error:', error);
        this.errorMsg = `Error ${error.status}: ${error.message}`;
      },
    });
  }
  onNextPage(): void {
    if (this.current_page < this.total_page) {
      this.current_page++;
      this.ongetsubmit();
    }
  }

  onPriviousPage(): void {
    if (this.current_page > 1) {
      this.current_page--;
      this.ongetsubmit();
    }
  }

  getEndRecord(): number {
    return Math.min(this.current_page * this.page_size, this.total_record);
  }
}
