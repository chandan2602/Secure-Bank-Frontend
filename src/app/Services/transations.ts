import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { Observable } from 'rxjs';

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

  ongetTransationService(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_userTransation`);
  }

  onNewTransation(): Observable<any> {
    return this.http.post(`${this.baseUrl}/add_newTransation`, this.TransationPayload);
  }

  onRefreshTransation(): Observable<any> {
    return this.http.put(`${this.baseUrl}/update_intrest`, null);
  }
}
