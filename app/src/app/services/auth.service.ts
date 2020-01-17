import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as global from '../globalConfig';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token)
  }
  getToken() {
    return localStorage.getItem("LoggedInUser")
  }
  isLoggedIn() {
    return this.getToken() !== null;
  }
  
  /* user login */
  login(formData) {
		return this.http.post(global.API_URL + 'login', formData);
  }

  /* user logout */
  logout() {
  	return this.http.post(global.API_URL+'logout', '');
  }
}
