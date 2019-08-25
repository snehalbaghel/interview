import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { ForbiddenComponent } from './auth/components/forbidden/forbidden.component';
import { UnauthorizedComponent } from './auth/components/unauthorized/unauthorized.component';
import { DetailsComponent } from './home/components/details/details.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'details', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'Forbidden', component: ForbiddenComponent },
  { path: 'Unauthorized', component: UnauthorizedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
