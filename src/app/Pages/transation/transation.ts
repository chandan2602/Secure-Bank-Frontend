import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TransactionPageResponse, TransationsServices } from '../../Services/transations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transation',
  imports: [Sidebar, CommonModule, FormsModule],
  templateUrl: './transation.html',
  styleUrl: './transation.css',
})
export class Transation implements OnInit {
  http = inject(HttpClient);
  serv = inject(TransationsServices);
  cdr = inject(ChangeDetectorRef);

  transation: TransactionPageResponse['Transation_List'] = [];
  totoal_amount = 0;
  total_transation: number = 0;
  Total_interest_amount: number = 0;
  Total_profit: number = 0;

  search: string = '';

  // add Pagination
  current_page = 1;
  page_size = 10;

  total_records: number = 0;
  total_pages: number = 0;

  isPopUp = false;
  Math: any;

  openPopUp() {
    this.isPopUp = true;
  }

  closePopUp() {
    this.isPopUp = false;
  }

  onFormSubmit() {
    this.closePopUp();
  }

  ngOnInit() {
    this.ontransation();
  }

  ontransation() {
    this.serv.ongetTransationService(this.current_page, this.page_size, this.search).subscribe({
      next: (res: TransactionPageResponse) => {
        this.transation = res.Transation_List;
        this.totoal_amount = res.total_records;
        this.total_transation = res.Total_amount;
        this.Total_interest_amount = res.Total_interest_amount;
        this.Total_profit = res.Total_profit;
        this.current_page = res.page;
        this.page_size = res.limit;
        this.total_pages = res.total_pages;
        this.total_records = res.total_records;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onNextTransation() {
    this.serv.onNewTransation().subscribe({
      next: (response: any) => {
        this.closePopUp();
        this.ontransation(); // reload list after adding
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onRefersh() {
    this.serv.onRefreshTransation().subscribe({
      next: () => {
        this.ontransation(); // reload updated data after refresh
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onPriviousPage(): void {
    if (this.current_page > 1) {
      this.current_page--;
      this.ontransation();
    }
  }

  onNextPage(): void {
    if (this.current_page < this.total_pages) {
      this.current_page++;

      this.ontransation();
    }
  }

  getEndRecord(): number {
    return Math.min(this.current_page * this.page_size, this.total_records);
  }

  onSerch() {
    this.current_page = 1;
    this.ontransation();
  }
}
