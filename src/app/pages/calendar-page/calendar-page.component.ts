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
    console.log(this.daysOfWeek)
    this.dSub = this.calendarService.date.subscribe(this.generate.bind(this))
  }

  generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').startOf('week')
    const endDay = now.clone().endOf('month').endOf('week')

    const date = startDay.clone().subtract(1, 'day')

    const calendar: Week[] = []

    while(date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone()
            const active = moment().isSame(value, 'day')
            const disabled = !now.isSame(value, 'month')
            const selected = false

            return {
              value, active, disabled, selected
            }
          })
      })
    }
    this.calendar = calendar
    console.log(calendar)
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
