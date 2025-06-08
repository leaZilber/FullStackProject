import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterPostModel } from '../models/registerDTO';
import { UserPostModel, UserUpdateModel } from '../components/user-management/user-management.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<RegisterPostModel[]> {
    return this.http.get<RegisterPostModel[]>("https://fullstackproject-5070.onrender.com/api/User");
  }

  getUser(id: number): Observable<RegisterPostModel> {
    return this.http.get<RegisterPostModel>(`https://fullstackproject-5070.onrender.com/api/User/${id}`);
  }

  getCurrentUser(): Observable<RegisterPostModel> {
    return this.http.get<RegisterPostModel>(`https://fullstackproject-5070.onrender.com/api/User/current`);
  }

  addUser(user: UserPostModel): Observable<RegisterPostModel> {
    return this.http.post<RegisterPostModel>("https://fullstackproject-5070.onrender.com/api/User", user);
  }

  updateUser(user: UserUpdateModel): Observable<RegisterPostModel> {
    return this.http.put<RegisterPostModel>(`https://fullstackproject-5070.onrender.com/api/User/${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`https://fullstackproject-5070.onrender.com/api/User/${id}`);
  }

  getUserStats(): Observable<any> {
    return this.http.get(`https://fullstackproject-5070.onrender.com/api/User/users-over-time`);
  }
}