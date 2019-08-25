import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
// import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FlexLayoutModule,
    AuthModule,
    HomeModule,
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule]

})
export class AppModule { }
