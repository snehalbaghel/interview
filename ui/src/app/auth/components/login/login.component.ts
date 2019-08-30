import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AuthStoreService } from '../../services/auth-store.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginData } from '../../models/login';
import { OAuthService } from 'angular-oauth2-oidc';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(private authStore: AuthStoreService, private router: Router,
              private oauthService: OAuthService, private snackBar: MatSnackBar) {   }

  private login() {
    if (!this.loginForm.valid) {
      this.snackBar.open('All fields are required', 'Close');
      return;
    }
    const loginData: LoginData = this.loginForm.value;
    console.log(loginData);
    this.authStore.postLogin(loginData);
  }

  private async googleLogin() {
    await this.oauthService.loadDiscoveryDocument();
    this.oauthService.initLoginFlow();
  }

  ngOnInit() {
  }

}
