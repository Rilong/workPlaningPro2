import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core'
import {Task} from '../../interfaces/task'
import {CheckEvent} from '../../interfaces/checkEvent'
import {EditEvent} from '../../interfaces/editEvent'

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.sass']
})
export class TasksListComponent implements OnInit, OnChanges {

  @Input() tasks: Task[]

  @Output() check: EventEmitter<CheckEvent> = new EventEmitter<CheckEvent>()
  @Output() delete: EventEmitter<number> = new EventEmitter<number>()
  @Output() edit: EventEmitter<EditEvent> = new EventEmitter<EditEvent>()
  @Output() save: EventEmitter<Task> = new EventEmitter<Task>()
  @Output() calendarChoose: EventEmitter<number> = new EventEmitter<number>()

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

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.tasks.isFirstChange() && changes.tasks.currentValue.length > changes.tasks.previousValue.length) {
      setTimeout(() => this.input.nativeElement.focus(), 0)
    }
  }
}
