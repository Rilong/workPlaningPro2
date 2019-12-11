import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core'
import {Task} from '../../interfaces/task'
import {CheckEvent} from '../../interfaces/checkEvent'
import {EditEvent} from '../../interfaces/editEvent'
import {Dropdown} from 'materialize-css'
import {CalendarChooseEvent} from '../../interfaces/СalendarChooseEvent'
import * as moment from 'moment'

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.sass']
})
export class TasksListComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() tasks: Task[]

  @Output() check: EventEmitter<CheckEvent> = new EventEmitter<CheckEvent>()
  @Output() delete: EventEmitter<number> = new EventEmitter<number>()
  @Output() edit: EventEmitter<EditEvent> = new EventEmitter<EditEvent>()
  @Output() save: EventEmitter<Task> = new EventEmitter<Task>()
  @Output() calendarChoose: EventEmitter<number> = new EventEmitter<number>()
  @Output() calendarChooseQuick: EventEmitter<CalendarChooseEvent> = new EventEmitter<CalendarChooseEvent>()

  @ViewChild('input', {static: false}) input: ElementRef<HTMLInputElement>

  constructor() { }

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

    this.calendarChooseQuick.emit({id, date})
  }


  ngAfterViewInit(): void {
    const elems = document.querySelectorAll('.dropdown-trigger')

    Dropdown.init(elems, {
      alignment: 'right',
      constrainWidth: false,
      hover: true,
      coverTrigger: false
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.tasks.isFirstChange() && changes.tasks.currentValue.length > changes.tasks.previousValue.length) {
      setTimeout(() => this.input.nativeElement.focus(), 0)
    }
  }
}
