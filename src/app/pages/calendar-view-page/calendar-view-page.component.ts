import {Component, OnDestroy, OnInit} from '@angular/core'
import {TaskService} from '../../shared/services/task/task.service'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {Subscription} from 'rxjs'
import {UserService} from '../../shared/services/user/user.service'
import {User} from '../../shared/interfaces/user'
import * as moment from 'moment'
import {environment} from '../../../environments/environment'
import {Task} from '../../shared/interfaces/task'
import {CheckEvent} from '../../shared/interfaces/checkEvent'
import {EditEvent} from '../../shared/interfaces/editEvent'

@Component({
  selector: 'app-calendar-view-page',
  templateUrl: './calendar-view-page.component.html',
  styleUrls: ['./calendar-view-page.component.sass']
})
export class CalendarViewPageComponent implements OnInit, OnDestroy {
  public date: moment.Moment
  tSub: Subscription
  user: User
  tasks: Task[] = []
  loading = false

  constructor(public taskService: TaskService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.userService.getUser()
    this.route.params.subscribe((params: Params) => {
      this.date = moment(params.date, 'DD-MM-YYYY')
      this.loading = true

      this.tSub = this.taskService.getAllByUser({
        date: this.date.format(environment.server_date_format)
      }).subscribe(tasks => {
        this.loading = false
        this.taskService.tasks = tasks
      }, () => this.loading = false)
    })
  }

  addTask() {
    this.taskService.addNewTask({
      user_id: this.userService.getUser().id,
      deadline_date: this.date.format(environment.server_date_format)
    })
  }

  updatedTasks(tasks: Task[]) {
    this.taskService.tasks = tasks.filter(t => t.deadline_date === this.date.format(environment.server_date_format))
  }

  ngOnDestroy(): void {
    if (this.tSub) {
      this.tSub.unsubscribe()
    }
    this.taskService.tasks = []
  }
}
