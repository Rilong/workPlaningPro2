import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import * as moment from 'moment'

@Injectable()
export class CalendarService {

  date: BehaviorSubject<moment.Moment> = new BehaviorSubject<moment.Moment>(moment())

  constructor() { }

  changeMouth(direction: number = 1) {
    this.date.value.add(direction, 'month')
    this.date.next(this.date.value)
  }
}
