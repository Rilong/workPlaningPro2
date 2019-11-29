import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core'
import {Task} from '../../interfaces/task'
import {CheckEvent} from '../../interfaces/checkEvent'
import {EditEvent} from '../../interfaces/editEvent'

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.sass']
})
export class TasksListComponent implements OnInit {

  @Input() tasks: Task[]

  @Output() check: EventEmitter<CheckEvent> = new EventEmitter<CheckEvent>()
  @Output() delete: EventEmitter<number> = new EventEmitter<number>()
  @Output() edit: EventEmitter<EditEvent> = new EventEmitter<EditEvent>()

  @ViewChild('input', {static: false}) input: ElementRef<HTMLInputElement>

  constructor() { }

  ngOnInit() {
  }

  showInput(idx: number) {
    this.tasks[idx].show_edit = true
    setTimeout(() => this.input.nativeElement.focus(), 0)
  }

  hideUpdate(value: string, idx: number) {
    this.tasks[idx].show_edit = false
    this.edit.emit({value, id: this.tasks[idx].id})
  }
}
