import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './auth/components/login/login.component';
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [LoginComponent]
})
export class AppModule { }
