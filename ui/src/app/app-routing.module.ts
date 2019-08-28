import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { UnauthorizedComponent } from './auth/components/unauthorized/unauthorized.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { TabsComponent } from './home/components/tabs/tabs.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'details', component: TabsComponent, canActivate: [AuthGuard] },
  { path: 'Unauthorized', component: UnauthorizedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
