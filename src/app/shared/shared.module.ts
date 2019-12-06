import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import { CalendarChooserComponent } from './components/calendar-chooser/calendar-chooser.component';

@NgModule({
  declarations: [CalendarChooserComponent],
  imports: [
    FormsModule,
    HttpClientModule
  ],
  exports: [
    FormsModule,
    HttpClientModule,
    CalendarChooserComponent
  ]
})
export class SharedModule {}
