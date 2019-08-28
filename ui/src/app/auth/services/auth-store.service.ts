import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginData, ID } from '../models/login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  static readonly BASE_AUTH_URL = 'http://127.0.0.1:3000/auth';

  private readonly isAuthenticatedBS = new BehaviorSubject<boolean>(localStorage.getItem('isAuthenticated') === 'true');
  readonly isAuthenticated$ = this.isAuthenticatedBS.asObservable();

  constructor(private http: HttpClient) {
  }

  getIsAuth() {
    this.http.get<{is_authenticated: boolean}>(`${AuthStoreService.BASE_AUTH_URL}/isAuthenticated`)
        .subscribe(res => {
          this.isAuthenticated = res.is_authenticated;
          localStorage.setItem('isAuthenticated', res.is_authenticated.toString());
        });
  }

  postLogin(loginData: LoginData) {
    this.http.post<{is_authenticated: boolean}>(`${AuthStoreService.BASE_AUTH_URL}/login`, loginData)
        .subscribe( res => {
          console.log(res)
          this.isAuthenticated =  res.is_authenticated;
          localStorage.setItem('isAuthenticated', res.is_authenticated.toString());
        });
  }

  private set isAuthenticated(flag: boolean) {
    this.isAuthenticatedBS.next(flag);
  }

  private get isAuthenticated(): boolean {
    return this.isAuthenticatedBS.getValue();
  }

  postToken(id: ID) {
    this.http.post<{is_authenticated: boolean}>(`${AuthStoreService.BASE_AUTH_URL}/verify/google`, id)
        .subscribe( res => {
          this.isAuthenticated = res.is_authenticated;
          localStorage.setItem('isAuthenticated', res.is_authenticated.toString());
        });
  }

}
