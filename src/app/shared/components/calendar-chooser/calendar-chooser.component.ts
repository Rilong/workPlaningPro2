import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core'
import {CalendarService} from '../../services/calendar/calendar.service'
import {Subscription} from 'rxjs'
import * as moment from 'moment'
import {Week} from '../../interfaces/calendar/week'
import {Day} from '../../interfaces/calendar/day'

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
  @Output() choose: EventEmitter<Day> = new EventEmitter<Day>()

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

  go(direction: number = 1) {
    this.calendarService.changeMouth(direction)
  }

  select(day: Day) {
    this.calendar.map(week => week.days.map(day => day.selected = false))
    day.selected = true
    this.choose.emit(day)
  }
}
