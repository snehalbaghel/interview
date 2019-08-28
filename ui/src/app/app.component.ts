import { Component } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { filter } from 'rxjs/operators';
import { AuthStoreService } from './auth/services/auth-store.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private oauthService: OAuthService, private authStore: AuthStoreService) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.setStorage(localStorage);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.events
      .pipe(filter((event: any) => event.type === 'token_received'))
      .subscribe(() => this.handleToken());
  }

  private handleToken() {
    if (this.oauthService.hasValidAccessToken()) {
      const payload = {id_token: this.id_token};
      this.authStore.postToken(payload);
    }
  }

  get id_token() {
    return this.oauthService.getIdToken();
  }

  get access_token() {
    return this.oauthService.getAccessToken();
  }


}
