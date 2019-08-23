import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginData } from '../models/login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  static readonly BASE_AUTH_URL = 'http://127.0.0.1:3000/auth/';

  private readonly isAuthenticatedBS = new BehaviorSubject<boolean>(false);
  readonly isAuthenticated$ = this.isAuthenticatedBS.asObservable();

  constructor(private http: HttpClient) { }

  login(loginData: LoginData) {
    this.http.post<{is_authenticated: boolean}>(`${AuthStoreService.BASE_AUTH_URL}/login`, loginData)
        .subscribe( auth => {
          this.isAuthenticated =  auth.is_authenticated;
        });
    // .pipe(map(res => ({ isAuthenticated: res.is_authenticated})));
  }

  private set isAuthenticated(flag: boolean) {
    this.isAuthenticatedBS.next(flag);
  }

  private get isAuthenticated(): boolean {
    return this.isAuthenticatedBS.getValue();
  }
}
