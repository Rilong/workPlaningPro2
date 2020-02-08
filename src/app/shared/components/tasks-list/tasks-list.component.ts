import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter, HostListener,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core'
import {Task} from '../../interfaces/task'
import {CheckEvent} from '../../interfaces/checkEvent'
import {EditEvent} from '../../interfaces/editEvent'
import {Dropdown, Modal} from 'materialize-css'
import {CalendarChooseEvent} from '../../interfaces/СalendarChooseEvent'
import * as moment from 'moment'
import {Day} from '../../interfaces/calendar/day'
import {ModalInstance} from '../../interfaces/modal'
import {environment} from '../../../../environments/environment'
import {TaskService} from '../../services/task/task.service'
import {ToastService} from '../../services/toast.service'
import {Subscription} from 'rxjs'

interface Calendar {
  day: Day
  taskId: number
  loading: boolean
}

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.sass']
})
export class TasksListComponent implements OnInit, AfterViewInit, OnDestroy {

  calendar: Calendar = {
    day: null,
    taskId: null,
    loading: false
  }
  private calendarModalInstance: ModalInstance = null

  private uSub: Subscription
  private uSub2: Subscription
  private sSub: Subscription
  private cSub: Subscription

  private tasksLoading = false
  @Output() update: EventEmitter<Task[]> = new EventEmitter<Task[]>()

  @ViewChild('input') input: ElementRef<HTMLInputElement>
  @ViewChild('calendarModal') calendarModal: ElementRef<HTMLDivElement>

  constructor(public taskService: TaskService, private toastService: ToastService) { }

  ngOnInit() {
    this.sSub = this.taskService.tasksChange.subscribe(() => {
      setTimeout(() => this.input.nativeElement.focus(), 0)
    })
  }

  showInput(idx: number) {
    this.taskService.tasks[idx].show_edit = true
    setTimeout(() => this.input.nativeElement.focus(), 0)
  }


  /**
   *
   * Tasks
   */

  checkToggle(check: CheckEvent) {
    const idx = this.taskService.tasks.findIndex((ts) => ts.id === check.id)
    this.tasksLoading = true

    this.taskService.toggleCheck(this.taskService.tasks[idx].project_id, check.id, {check: check.checked})
      .subscribe(
        () => this.tasksLoading = false,
        () => this.tasksLoading = false
      )

    this.taskService.tasks[idx].is_done = check.checked ? 1 : 0
  }

  taskDelete(id: number) {
    this.tasksLoading = true
    const projectId = this.taskService.tasks.find((ts) => ts.id === id).project_id
    if (id > 0) {
      this.taskService.delete(projectId, id)
        .subscribe(
          () => this.tasksLoading = false,
          () => this.tasksLoading = false
        )
    }

    this.taskService.tasks = this.taskService.tasks.filter((ts) => ts.id !== id)
  }

  taskAddSave(task: Task) {
    const idx = this.taskService.tasks.findIndex(ts => ts.id === task.id)
    this.tasksLoading = true

    this.cSub = this.taskService.create(this.taskService.tasks[idx].project_id, task).subscribe((task) => {
      this.tasksLoading = false
      this.taskService.tasks[idx] = task
      setTimeout(() => this.dropdownInit(), 0)
    }, () => this.tasksLoading = false)

  }

  taskEdit(values: EditEvent) {
    const idx = this.taskService.tasks.findIndex(ts => ts.id === values.id)
    this.taskService.tasks[idx].title = values.value
    this.tasksLoading = true
    this.uSub = this.taskService.update(this.taskService.tasks[idx].project_id, this.taskService.tasks[idx].id, {title: values.value})
      .subscribe(
        () => this.tasksLoading = false,
        () => this.tasksLoading = false
      )
  }

  saveTask(value: string, idx: number) {
    if (value.trim() && !this.tasksLoading) {
      const id = this.taskService.tasks[idx].id
      this.taskService.tasks[idx].show_edit = false
      if (id > 0) {
        this.taskEdit({id, value})
      } else {
        this.taskService.tasks[idx].title = value
        this.taskAddSave(this.taskService.tasks[idx])
      }
    }
  }

  /**
   *
   * Calendar
   *
   */

  chooseQuick($event: Event, id: number, day: string = 'today') {
    $event.preventDefault()
    const date: moment.Moment = moment()
    date.hours(0)
    date.minutes(0)
    date.seconds(0)
    if (day === 'tomorrow') {
      date.add(1, 'day')
    }

    this.calendarChooseQuick({id, date})
  }


  calendarChooseOpen() {
    this.calendarModalInstance.open()
  }

  calendarChooserClose() {
    this.calendarModalInstance.close()
  }

  calendarChoose(taskId:  number) {
    this.calendar.taskId = taskId
    this.calendarChooseOpen()
  }

  calendarChooseQuick($event: CalendarChooseEvent) {
    this.calendar.day = {
      value: $event.date,
      selected: false,
      disabled: false,
      active: false
    }
    this.calendar.taskId = $event.id
    this.calendarChooserApply()
  }

  calendarChooserApply() {
    const projectId = this.taskService.tasks.find(ts => ts.id === this.calendar.taskId).project_id
    const deadline_date = this.calendar.day.value.format(environment.server_date_format)
    this.calendar.loading = true

    this.uSub2 = this.taskService.update(projectId, this.calendar.taskId, {deadline_date})
      .subscribe(() => {
        const taskIndex = this.taskService.tasks.findIndex((ts) => ts.id === this.calendar.taskId)

        this.taskService.tasks[taskIndex].deadline_date = deadline_date
        this.calendar.loading = false
        this.calendar.taskId = null
        this.calendar.day.selected = false
        this.calendar.day = null

        this.toastService.open('Дату встановлено', 'success')
        this.update.emit(this.taskService.tasks.concat())
        this.calendarChooserClose()
      }, () => this.calendar.loading = false)
  }

  calendarSelect(day: Day) {
    this.calendar.day = day
  }

  dropdownInit() {
    const elems = document.querySelectorAll('.dropdown-trigger')

    Dropdown.init(elems, {
      alignment: 'right',
      constrainWidth: false,
      hover: true,
      coverTrigger: false
    })
  }

  ngAfterViewInit(): void {
    this.dropdownInit()

    this.calendarModalInstance = Modal.init(this.calendarModal.nativeElement, {
      onCloseEnd: el => this.calendar.taskId = null
    })
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: Event) {
    $event.preventDefault()

    if (this.tasksLoading) {
      $event.returnValue = true
    }
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }

    if (this.uSub2) {
      this.uSub2.unsubscribe()
    }

    if (this.sSub) {
      this.sSub.unsubscribe()
    }

    if (this.cSub) {
      this.cSub.unsubscribe()
    }
  }
}
