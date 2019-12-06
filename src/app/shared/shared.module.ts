import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    HttpClientModule
  ],
  exports: [
    FormsModule,
    HttpClientModule,
  ]
})
export class SharedModule {}
