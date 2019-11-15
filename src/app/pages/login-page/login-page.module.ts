import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './login-page.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: LoginPageComponent}
    ])
  ]
})
export class LoginPageModule {
}
