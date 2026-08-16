import { Injectable,inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashbordService {

  http = inject(HttpClient)

  baseUrl = `${environment.apiUrl}/registration`

  getprofile():Observable<any>{
    return this.http.get(`${this.baseUrl}/get_users`)
  }
  
}
