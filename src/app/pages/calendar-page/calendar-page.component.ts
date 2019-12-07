import {Component, OnDestroy, OnInit} from '@angular/core'
import {CalendarService} from '../../shared/services/calendar/calendar.service'
import * as moment from 'moment'
import {Subscription} from 'rxjs'
import {Week} from '../../shared/interfaces/calendar/week'

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.sass'],
  providers: [CalendarService]
})
export class CalendarPageComponent implements OnInit, OnDestroy {

  dSub: Subscription
  daysOfWeek: string[]
  calendar: Week[]

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    this.daysOfWeek = moment.weekdays(true)
    this.dSub = this.calendarService.date.subscribe((now: moment.Moment) => {
      this.calendar = this.calendarService.generate(now)
    })
  }

  go(direction: number = 1) {
    this.calendarService.changeMouth(direction)
  }

  ngOnDestroy(): void {
    if(this.dSub) {
      this.dSub.unsubscribe()
    }
  }
}
