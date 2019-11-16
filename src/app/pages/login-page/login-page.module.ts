import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './login-page.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module'
import {ReactiveFormsModule} from '@angular/forms'

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: LoginPageComponent}
    ])
  ]
})
export class LoginPageModule {
}
