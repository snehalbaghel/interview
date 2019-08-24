import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthStoreService } from '../../services/auth-store.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { skip, first} from 'rxjs/operators';
import { LoginData } from '../../models/login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(private authStore: AuthStoreService, private router: Router) {
   }

  login() {
    const loginData: LoginData = this.loginForm.value;
    this.authStore.login(loginData);
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

  ngOnDestroy() {
  }

  ngOnInit() {
  }

}
