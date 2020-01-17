import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as global from '../globalConfig';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  
  /* user registration */
  registration(formData) {
		return this.http.post(global.API_URL + 'register', formData);
  }
}
