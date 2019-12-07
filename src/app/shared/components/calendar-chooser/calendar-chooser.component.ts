import {Component, OnDestroy, OnInit} from '@angular/core'
import {CalendarService} from '../../services/calendar/calendar.service'
import {Subscription} from 'rxjs'
import * as moment from 'moment'
import {Week} from '../../interfaces/calendar/week'

@Component({
  selector: 'app-calendar-chooser',
  templateUrl: './calendar-chooser.component.html',
  styleUrls: ['./calendar-chooser.component.sass'],
  providers: [CalendarService]
})
export class CalendarChooserComponent implements OnInit, OnDestroy {

  private dSub: Subscription
  private calendar: Week[]
  private daysOfWeek: string[] = null

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    this.daysOfWeek = moment.weekdaysShort()
    this.dSub = this.calendarService.date.subscribe((now: moment.Moment) => {
      this.calendar = this.calendarService.generate(now)
    })
  }

  ngOnDestroy(): void {
    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }

}
