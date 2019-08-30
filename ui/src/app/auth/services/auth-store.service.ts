import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginData, ID, AuthResponse } from '../models/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    this.http.get<AuthResponse>(`${AuthStoreService.BASE_AUTH_URL}/isAuthenticated`,
        { withCredentials: true,
          headers: new HttpHeaders().append('Content-Type', 'application/json')
        }
        )
        .subscribe(res => {
          this.isAuthenticated = res.is_authenticated;
          localStorage.setItem('isAuthenticated', res.is_authenticated.toString());
        });
  }

  postLogin(loginData: LoginData) {
    this.http.post<AuthResponse>(`${AuthStoreService.BASE_AUTH_URL}/login`, loginData,
        { withCredentials: true,
          headers: new HttpHeaders().append('Content-Type', 'application/json')
        }
        )
        .subscribe( res => {
          console.log(res);
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
    this.http.post<AuthResponse>(`${AuthStoreService.BASE_AUTH_URL}/verify/google`, id,
        { withCredentials: true,
          headers: new HttpHeaders().append('Content-Type', 'application/json')
        }
        )
        .subscribe( res => {
          this.isAuthenticated = res.is_authenticated;
          localStorage.setItem('isAuthenticated', res.is_authenticated.toString());
        });
  }

  postLogout() {
    this.http.post<AuthResponse>(`${AuthStoreService.BASE_AUTH_URL}/logout`, null,
        { withCredentials: true,
          headers: new HttpHeaders().append('Content-Type', 'application/json')
        })
        .subscribe( res => {
          this.isAuthenticated = res.is_authenticated;
          localStorage.setItem('isAuthenticated', res.is_authenticated.toString());
        });
  }

}
