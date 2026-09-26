import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

export interface MemberProfile {
  Name: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashbordService {
  http = inject(HttpClient);

  readonly profileName = signal('Member');

  baseUrl = `${environment.apiUrl}/registration`;

  getprofile(): Observable<MemberProfile> {
    return this.http.get<MemberProfile>(`${this.baseUrl}/get_users`).pipe(
      tap((profile) => {
        const name = profile.Name?.trim();
        if (name) {
          this.profileName.set(name);
        }
      }),
    );
  }
}
