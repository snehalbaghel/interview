import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './auth/components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { TabsComponent } from './auth/components/tabs/tabs.component'; 

@NgModule({
  declarations: [
    LoginComponent,
    TabsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [TabsComponent]
})
export class AppModule { }
