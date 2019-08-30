import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthStoreService } from 'src/app/auth/services/auth-store.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  name = '!!!';
  viewMode = 'tab1';
  profile$: Observable<any>;

  updateForm: FormGroup = new FormGroup({
    givenName: new FormControl(null, Validators.required),
    familyName: new FormControl(null, Validators.required),
    mobileNo: new FormControl(null, [Validators.minLength(10), Validators.required]),
    address: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    state: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required)
  });

  constructor(private userService: UserService, private snackBar: MatSnackBar, private authStore: AuthStoreService,
              private oauthService: OAuthService) {
    this.profile$ = this.userService.profile$;
    this.userService.getProfile();
  }

  updateProfile() {
    console.log(this.updateForm.valid);
    const payload = this.updateForm.value;
    for (const prop in payload) {
      if (payload[prop] === null || payload[prop] === undefined) {
        delete payload[prop];
      }
    }
    if (!this.isEmpty(payload)) {
      this.userService.updateProfile(payload).subscribe(
        res => {
          this.snackBar.open(res.message, 'Hide');
          this.userService.getProfile();
        }
      );
    }
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  async logout() {
    await this.oauthService.logOut();
    this.authStore.postLogout();
  }

  ngOnInit() {
  }

}
