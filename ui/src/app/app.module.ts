import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppComponent } from './app.component';

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
  providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule]

})
export class AppModule { }
