import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Profile } from 'selenium-webdriver/firefox';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static readonly BASE_URL = 'http://127.0.0.1:3000/user';

  private readonly profileSubject = new BehaviorSubject<Profile>(null);
  readonly profile$ = this.profileSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  getProfile() {
    this.http.get(UserService.BASE_URL + '/profile', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }).subscribe(res => {
      this.profile = res;
    });
  }

  updateProfile(profile) {
    return this.http.post<{message: string}>(UserService.BASE_URL + '/profile', profile , {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  private set profile(profile: any) {
    this.profileSubject.next(profile);
  }
}
