import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AuthGuard} from './shared/auth.guard';
import {ReverseAuthGuard} from './shared/reverse-auth.guard'


const routes: Routes = [
  {path: '', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'login', loadChildren: './pages/login-page/login-page.module#LoginPageModule', canLoad: [ReverseAuthGuard]},
  {path: 'register', loadChildren: './pages/register-page/register-page.module#RegisterPageModule', canLoad: [ReverseAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
