import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AuthGuard} from './shared/auth.guard';


const routes: Routes = [
  {path: '', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'login', loadChildren: './pages/login-page/login-page.module#LoginPageModule'},
  {path: 'register', loadChildren: './pages/register-page/register-page.module#RegisterPageModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
