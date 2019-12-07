import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import * as moment from 'moment'
import {Week} from '../../interfaces/calendar/week'

@Injectable()
export class CalendarService {

  date: BehaviorSubject<moment.Moment> = new BehaviorSubject<moment.Moment>(moment())

  constructor() { }

  changeMouth(direction: number = 1) {
    this.date.value.add(direction, 'month')
    this.date.next(this.date.value)
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
    return calendar
  }
}
