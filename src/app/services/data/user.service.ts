import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'charset': 'UTF-8'
    })
  };

  constructor(private http: HttpClient) { }

  register(user): Observable<any> {
    return this.http.post('/api/user', JSON.stringify(user), this.httpOptions);
  }

  login(credentials): Observable<any> {
    return this.http.post('/api/login', JSON.stringify(credentials), this.httpOptions);
  }

  renewToken(user): Observable<any> {
    return this.http.post('/api/renewToken', JSON.stringify(user), this.httpOptions);
  }

  getUsers(): Observable<any> {
    return this.http.get('/api/users');
  }

  countUsers(): Observable<any> {
    return this.http.get('/api/users/count');
  }

  addUser(user): Observable<any> {
    return this.http.post('/api/user', JSON.stringify(user), this.httpOptions);
  }

  getUser(user): Observable<any> {
    return this.http.get(`/api/user/${user._id}`);
  }

  editUser(user): Observable<any> {
    return this.http.put(`/api/user/${user._id}`, JSON.stringify(user), this.httpOptions);
  }

  deleteUser(user): Observable<any> {
    return this.http.delete(`/api/user/${user._id}`, this.httpOptions);
  }

}
