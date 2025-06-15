// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { RegisterPostModel } from '../models/registerDTO';
// import { UserPostModel, UserUpdateModel } from '../components/user-management/user-management.component';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   constructor(private http: HttpClient) {}

//   getAllUsers(): Observable<RegisterPostModel[]> {
//     return this.http.get<RegisterPostModel[]>("https://fullstackproject-5070.onrender.com/api/User");
//   }

//   getUser(id: number): Observable<RegisterPostModel> {
//     return this.http.get<RegisterPostModel>(`https://fullstackproject-5070.onrender.com/api/User/${id}`);
//   }

//   getCurrentUser(): Observable<RegisterPostModel> {
//     return this.http.get<RegisterPostModel>(`https://fullstackproject-5070.onrender.com/api/User/current`);
//   }

//   addUser(user: UserPostModel): Observable<RegisterPostModel> {
//     return this.http.post<RegisterPostModel>("https://fullstackproject-5070.onrender.com/api/User", user);
//   }

//   updateUser(user: UserUpdateModel): Observable<RegisterPostModel> {
//     return this.http.put<RegisterPostModel>(`https://fullstackproject-5070.onrender.com/api/User/${user.id}`, user);
//   }

//   deleteUser(id: number): Observable<any> {
//     return this.http.delete(`https://fullstackproject-5070.onrender.com/api/User/${id}`);
//   }

//   getUserStats(): Observable<any> {
//     return this.http.get(`https://fullstackproject-5070.onrender.com/api/User/users-over-time`);
//   }
// }











// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { RegisterPostModel } from '../models/registerDTO';
// import { UserUpdateModel } from '../components/user-management/user-management.component';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   constructor(private http: HttpClient) {}

//   getAllUsers(): Observable<RegisterPostModel[]> {
//     console.log('API URL:',"https://fullstackproject-5070.onrender.com/api/User" ); 
//     return this.http.get<RegisterPostModel[]>("https://fullstackproject-5070.onrender.com/api/User");
//   }

//   getUser(id: number): Observable<RegisterPostModel> {
//     return this.http.get<RegisterPostModel>(`https://fullstackproject-5070.onrender.com/api/User/${id}`);
//   }

//   getCurrentUser(): Observable<RegisterPostModel> {
//     return this.http.get<RegisterPostModel>(`https://fullstackproject-5070.onrender.com/api/User/current`);
//   }

//   addUser(user: RegisterPostModel): Observable<RegisterPostModel> {
//     return this.http.post<RegisterPostModel>("https://fullstackproject-5070.onrender.com/api/User", user);
//   }

//   updateUser(user: UserUpdateModel): Observable<RegisterPostModel> {
//     return this.http.put<RegisterPostModel>(`https://fullstackproject-5070.onrender.com/api/User/${user.UserId}`, user);
//   }

//   deleteUser(id: number): Observable<any> {
//     return this.http.delete(`https://fullstackproject-5070.onrender.com/api/User/${id}`);
//   }

//   getUserStats(): Observable<any> {
//     return this.http.get(`https://fullstackproject-5070.onrender.com/api/User/users-over-time`);
//   }
// }










import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { RegisterPostModel } from '../models/registerDTO';
import { UserUpdateModel } from '../components/user-management/user-management.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl = "https://fullstackproject-5070.onrender.com/api/User";
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('HTTP Error occurred:', error);
    
    if (error.status === 0) {
      // CORS or network error
      console.error('CORS or Network error:', error.error);
      return throwError(() => new Error('Network error - check CORS configuration or server availability'));
    } else if (error.status >= 500) {
      // Server error
      console.error('Server error:', error.message);
      return throwError(() => new Error('Server error - check backend logs'));
    } else {
      // Client-side or other error
      return throwError(() => new Error(`Error ${error.status}: ${error.message}`));
    }
  }

  getAllUsers(): Observable<RegisterPostModel[]> {
    console.log('API URL:', this.baseUrl); 
    return this.http.get<RegisterPostModel[]>(this.baseUrl, this.httpOptions)
      .pipe(
        timeout(30000), // 30 second timeout
        catchError(this.handleError)
      );
  }

  getUser(id: number): Observable<RegisterPostModel> {
    return this.http.get<RegisterPostModel>(`${this.baseUrl}/${id}`, this.httpOptions)
      .pipe(
        timeout(30000),
        catchError(this.handleError)
      );
  }

  getCurrentUser(): Observable<RegisterPostModel> {
    return this.http.get<RegisterPostModel>(`${this.baseUrl}/current`, this.httpOptions)
      .pipe(
        timeout(30000),
        catchError(this.handleError)
      );
  }

  addUser(user: RegisterPostModel): Observable<RegisterPostModel> {
    return this.http.post<RegisterPostModel>(this.baseUrl, user, this.httpOptions)
      .pipe(
        timeout(30000),
        catchError(this.handleError)
      );
  }

  updateUser(user: UserUpdateModel): Observable<RegisterPostModel> {
    console.log('Updating user with data:', user);
    return this.http.put<RegisterPostModel>(`${this.baseUrl}/${user.UserId}`, user, this.httpOptions)
      .pipe(
        timeout(30000),
        catchError(this.handleError)
      );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.httpOptions)
      .pipe(
        timeout(30000),
        catchError(this.handleError)
      );
  }

  getUserStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users-over-time`, this.httpOptions)
      .pipe(
        timeout(30000),
        catchError(this.handleError)
      );
  }
}