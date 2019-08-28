import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static readonly BASE_URL = 'http://127.0.0.1:3000/user';


  constructor(private http: HttpClient) {
  }

  getProfile() {
    return this.http.get(UserService.BASE_URL + '/profile', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  updateProfile(profile) {
    return this.http.post(UserService.BASE_URL + 'addItem', profile , {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
