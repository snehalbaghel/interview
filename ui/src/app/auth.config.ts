import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin + '/signup',
    clientId: '282748197640-m9v85o6dn5bgerqumh5fl5h81p370gr9.apps.googleusercontent.com',
    scope: 'openid profile email',
    responseType: 'code',
    showDebugInformation: true,
    strictDiscoveryDocumentValidation: false,
};
