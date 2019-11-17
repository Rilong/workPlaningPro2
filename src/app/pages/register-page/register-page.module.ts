import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterPageComponent} from './register-page.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms'
import {SharedModule} from '../../shared/shared.module'



@NgModule({
  declarations: [RegisterPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: RegisterPageComponent}
    ]),
    ReactiveFormsModule
  ]
})
export class RegisterPageModule { }
