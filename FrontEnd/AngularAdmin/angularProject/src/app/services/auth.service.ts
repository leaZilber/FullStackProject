import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${environment.apiUrl}/User`, data);
  }

  login(data: any) {
    return this.http.post(`${environment.apiUrl}/Auth/admin-login`, data);
  }

  getUserStatsOverTime(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/User/users-over-time`);
  }
}
