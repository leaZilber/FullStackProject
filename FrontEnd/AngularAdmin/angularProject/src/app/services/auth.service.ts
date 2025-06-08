import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post("https://fullstackproject-5070.onrender.com/api/User", data);
  }

  login(data: any) {
    return this.http.post("https://fullstackproject-5070.onrender.com/api/Auth/admin-login", data);
  }

  getUserStatsOverTime(): Observable<any[]> {
    return this.http.get<any[]>("https://fullstackproject-5070.onrender.com/api/User/users-over-time");
  }
}
