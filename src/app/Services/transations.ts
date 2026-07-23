import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransationsServices {
  http = inject(HttpClient);

  baseUrl = env.apiUrl;

  // TransationPayload = {
  //   full_name : '',
  //   mobile_number : '',
  //   email : '',
  //   amount: '',
  //   loan_date : Date
  // }

  onTransationService(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_userTransation`);
  }
}
