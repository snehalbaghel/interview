import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthStoreService } from './services/auth-store.service';
// import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    UnauthorizedComponent,
    ForbiddenComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
