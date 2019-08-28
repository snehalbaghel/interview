import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AuthStoreService } from '../../services/auth-store.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { skip, first } from 'rxjs/operators';
import { LoginData } from '../../models/login';
import { OAuthService } from 'angular-oauth2-oidc';
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

  constructor(private authStore: AuthStoreService, private router: Router, private oauthService: OAuthService) {
    this.authStore.isAuthenticated$
      .subscribe(
      auth => {
        console.log(auth);

        if (auth) {
          this.router.navigate(['details']);
        }

      },
      err => {
        console.log(err);
      }
      );
  }

  private login() {
    const loginData: LoginData = this.loginForm.value;
    console.log(loginData);
    this.authStore.postLogin(loginData);
    this.authStore.isAuthenticated$
      .pipe(
        skip(1),
        first()
        ).subscribe(
      auth => {
        console.log(auth);
        this.router.navigate(['details']);
      },
      err => {
        console.log(err);
      }
    );
  }

  private async googleLogin() {
    await this.oauthService.loadDiscoveryDocument();
    this.oauthService.initLoginFlow();
  }

  ngOnInit() {
  }

}
