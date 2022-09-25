import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LandingComponent } from './pages/landing/landing.component';


const routes: Routes = [
  { path:'inicio',component:LandingComponent},
  { path:'login',component:LoginComponent},
  { path:'registro',component:RegisterComponent},
  { path:'recuperar',component:ForgotPasswordComponent},
  { path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard]} ,
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  // { path: '**', redirectTo: '/inicio', pathMatch: 'full' },
];



@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
