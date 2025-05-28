import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://localhost:7245/api';
  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.baseUrl}/User`, data);
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/Auth/admin-login`, data);
  }

  getUserStatsOverTime(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/User/users-over-time`);
  }
}
