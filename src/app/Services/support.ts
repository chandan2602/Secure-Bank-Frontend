import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Supportservice {

    http = inject(HttpClient)
    baseUrl = environment.apiUrl

    body = {
      full_name : "",
      mobile_number : "",
      email : "",
      Description : "",
    }

    onAddUserSupport():Observable<any>{
        return this.http.post(`${this.baseUrl}/add_support`,this.body)
    }

    ongetsupport():Observable<any>{
      return this.http.get(`${this.baseUrl}/get_support`)
    }
}
