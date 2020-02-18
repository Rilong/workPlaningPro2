import {Component, OnDestroy, OnInit} from '@angular/core'
import {CalendarService} from '../../shared/services/calendar/calendar.service'
import * as moment from 'moment'
import {Subscription} from 'rxjs'
import {Week} from '../../shared/interfaces/calendar/week'
import {TaskService} from '../../shared/services/task/task.service'
import {UserService} from '../../shared/services/user/user.service'
import {User} from '../../shared/interfaces/user'
import {environment} from '../../../environments/environment'
import {Task} from '../../shared/interfaces/task'

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.sass'],
  providers: [CalendarService]
})
export class CalendarPageComponent implements OnInit, OnDestroy {

  public daysOfWeek: string[]
  public calendar: Week[]
  dSub: Subscription
  tSub: Subscription
  user: User
  tasks: Task[] = []
  loadingTasks = false

  constructor(public calendarService: CalendarService,
              private taskService: TaskService,
              private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser()
    this.daysOfWeek = moment.weekdays(true)
    this.dSub = this.calendarService.date.subscribe((now: moment.Moment) => {
      this.loadingTasks = true
      this.tSub = this.taskService.getAllByUser({ date_month: now.format(environment.server_date_format) })
        .subscribe(tasks => {
          this.loadingTasks = false
          this.tasks = tasks
        }, () => this.loadingTasks = false)
      this.calendar = this.calendarService.generate(now)
    })
  }

  go(direction: number = 1) {
    if (this.tSub) {
      this.tSub.unsubscribe()
    }
    this.calendarService.changeMouth(direction)
  }

  filterTasksByDate(date: moment.Moment) {
    return this.tasks.filter(t => moment(t.deadline_date).isSame(date, 'day'))
  }

  ngOnDestroy(): void {
    if(this.dSub) {
      this.dSub.unsubscribe()
    }

    if (this.tSub) {
      this.tSub.unsubscribe()
    }
  }
}
