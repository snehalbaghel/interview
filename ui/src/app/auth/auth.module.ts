import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { TabsComponent } from './components/tabs/tabs.component';

@NgModule({
  declarations: [
    LoginComponent,
    TabsComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
