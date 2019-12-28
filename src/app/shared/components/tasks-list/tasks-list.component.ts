import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
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
export class TasksListComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  calendar: Calendar = {
    day: null,
    taskId: null,
    loading: false
  }
  calendarModalInstance: ModalInstance = null

  private uSub: Subscription

  @Input() tasks: Task[]
  @Output() check: EventEmitter<CheckEvent> = new EventEmitter<CheckEvent>()
  @Output() delete: EventEmitter<number> = new EventEmitter<number>()
  @Output() edit: EventEmitter<EditEvent> = new EventEmitter<EditEvent>()
  @Output() save: EventEmitter<Task> = new EventEmitter<Task>()

  @Output() update: EventEmitter<Task[]> = new EventEmitter<Task[]>()
  @ViewChild('input', {static: false}) input: ElementRef<HTMLInputElement>
  @ViewChild('calendarModal', {static: false}) calendarModal: ElementRef<HTMLDivElement>

  constructor(private taskService: TaskService, private toastService: ToastService) { }

  ngOnInit() {
  }

  showInput(idx: number) {
    this.tasks[idx].show_edit = true
    setTimeout(() => this.input.nativeElement.focus(), 0)
  }

  saveTask(value: string, idx: number) {
    this.tasks[idx].show_edit = false
    if (value.trim()) {
      if (this.tasks[idx].id > 0) {
        this.edit.emit({value, id: this.tasks[idx].id})
      } else {
        this.tasks[idx].title = value
        this.save.emit(this.tasks[idx])
      }
    }
  }

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
    console.log(!!this.calendar.day)
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
    const projectId = this.tasks.find(ts => ts.id === this.calendar.taskId).project_id
    const deadline_date = this.calendar.day.value.format(environment.server_date_format)
    this.calendar.loading = true

    this.uSub = this.taskService.update(projectId, this.calendar.taskId, {deadline_date})
      .subscribe(() => {
        const taskIndex = this.tasks.findIndex((ts) => ts.id === this.calendar.taskId)

        this.tasks[taskIndex].deadline_date = deadline_date
        this.calendar.loading = false
        this.calendar.taskId = null
        this.calendar.day.selected = false
        this.calendar.day = null

        this.toastService.open('Дату встановлено', 'success')
        this.update.emit(this.tasks.concat())
        this.calendarChooserClose()
      }, () => this.calendar.loading = false)
  }

  calendarSelect(day: Day) {
    this.calendar.day = day
  }

  ngAfterViewInit(): void {
    const elems = document.querySelectorAll('.dropdown-trigger')

    Dropdown.init(elems, {
      alignment: 'right',
      constrainWidth: false,
      hover: true,
      coverTrigger: false
    })

    this.calendarModalInstance = Modal.init(this.calendarModal.nativeElement, {
      onCloseEnd: el => this.calendar.taskId = null
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.tasks.isFirstChange() && changes.tasks.currentValue.length > changes.tasks.previousValue.length) {
      setTimeout(() => this.input.nativeElement.focus(), 0)
    }
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }
}
