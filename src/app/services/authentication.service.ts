import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: string, psw: string): Observable<any> {
    const param: LoginParam = { userName: username, password: psw };
    return this.http.post<any>(`/users/authenticate`, param);
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}

interface LoginParam {
  userName: string;
  password: string;
};