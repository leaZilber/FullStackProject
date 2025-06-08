import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterPostModel } from '../models/registerDTO';
import { UserPostModel, UserUpdateModel } from '../components/user-management/user-management.component';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl ="https://fullstackproject-5070.onrender.com/api/User";

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<RegisterPostModel[]> {
    return this.http.get<RegisterPostModel[]>(this.apiUrl);
  }

  getUser(id: number): Observable<RegisterPostModel> {
    return this.http.get<RegisterPostModel>(`${this.apiUrl}/${id}`);
  }

  getCurrentUser(): Observable<RegisterPostModel> {
    return this.http.get<RegisterPostModel>(`${this.apiUrl}/current`);
  }

  addUser(user: UserPostModel): Observable<RegisterPostModel> {
    return this.http.post<RegisterPostModel>(this.apiUrl, user);
  }

  updateUser(user: UserUpdateModel): Observable<RegisterPostModel> {
    return this.http.put<RegisterPostModel>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getUserStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users-over-time`);
  }
}