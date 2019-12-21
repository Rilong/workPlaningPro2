import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AuthGuard} from './shared/auth.guard';
import {ReverseAuthGuard} from './shared/reverse-auth.guard'
import {ProjectPageComponent} from './pages/project-page/project-page.component'
import {CalendarPageComponent} from './pages/calendar-page/calendar-page.component'
import {ProjectSaveGuard} from './shared/project-save.guard'
import {CalendarViewPageComponent} from './pages/calendar-view-page/calendar-view-page.component'


const routes: Routes = [
  {path: '', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'login', loadChildren: './pages/login-page/login-page.module#LoginPageModule', canLoad: [ReverseAuthGuard]},
  {path: 'register', loadChildren: './pages/register-page/register-page.module#RegisterPageModule', canLoad: [ReverseAuthGuard]},
  {path: 'project/:id', component: ProjectPageComponent, canActivate: [AuthGuard], canDeactivate: [ProjectSaveGuard]},
  {path: 'calendar', component: CalendarPageComponent, canActivate: [AuthGuard]},
  {path: 'calendar/:date', component: CalendarViewPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
