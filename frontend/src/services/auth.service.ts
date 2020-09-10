import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _registerUrl: string = environment.serverURL + '/api/register';
  private _loginUrl: string = environment.serverURL + '/api/login';
  private _changeUrl: string = environment.serverURL + '/api/changepass';

  constructor(private http: HttpClient, private _router: Router) {}

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  changePass(data) {
    return this.http.post<any>(this._changeUrl, data);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['home']);
  }

  refreshToken(token) {
    localStorage.removeItem('token');
    localStorage.setItem('token', token);
  }
}
