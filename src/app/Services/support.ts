import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface SupportRequest {
  full_name: string;
  mobile_number: string;
  email: string;
  Description: string;
}

export interface SupportResponse {
  page: number;
  limit: number;
  Total_pages: number;
  total_record: number;
  all_support: SupportRequest[];
}

@Injectable({
  providedIn: 'root',
})
export class Supportservice {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/support`;

  body = {
    full_name: '',
    mobile_number: '',
    email: '',
    Description: '',
  };

  onAddUserSupport(): Observable<any> {
    return this.http.post(`${this.baseUrl}/add_support`, this.body);
  }

  ongetsupport(page: number, limit: number, search: string): Observable<SupportResponse> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    const cleanedSearch = search.trim();
    if (cleanedSearch) {
      params = params.set('search', cleanedSearch);
    }

    return this.http.get<SupportResponse>(`${this.baseUrl}/get_support`, { params });
  }
}
