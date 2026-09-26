import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

export interface TransactionRecord {
  full_name: string;
  mobile_number: string;
  email: string;
  loan_date: string;
  amount: number;
  intrest_rate: number;
  total_days: number;
  interest_amount: number;
  total_amount: number;
}

export interface TransactionPageResponse {
  page: number;
  limit: number;
  total_records: number;
  total_pages: number;
  Transation_List: TransactionRecord[];
  Total_amount: number;
  Total_interest_amount: number;
  Total_profit: number;
}

@Injectable({
  providedIn: 'root',
})
export class TransationsServices {
  http = inject(HttpClient);

  baseUrl = `${env.apiUrl}/transation`;

  TransationPayload = {
    full_name: '',
    mobile_number: '',
    email: '',
    amount: '',
    loan_date: Date,
    intrest_rate: 0,
    total_days: 0,
    interest_amount: 0,
    total_amount: 0,
  };

  ongetTransationService(
    page: number,
    limit: number,
    search: string,
  ): Observable<TransactionPageResponse> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    const cleanedSearch = search.trim();
    if (cleanedSearch) {
      params = params.set('search', cleanedSearch);
    }

    return this.http.get<TransactionPageResponse>(`${this.baseUrl}/get_userTransation`, {
      params,
    });
  }

  onNewTransation(): Observable<any> {
    return this.http.post(`${this.baseUrl}/add_newTransation`, this.TransationPayload);
  }

  onRefreshTransation(): Observable<any> {
    return this.http.put(`${this.baseUrl}/update_intrest`, null);
  }
}
