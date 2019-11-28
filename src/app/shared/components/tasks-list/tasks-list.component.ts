import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Task} from '../../interfaces/task'
import {CheckEvent} from '../../interfaces/checkEvent'

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.sass']
})
export class TasksListComponent implements OnInit {

  @Input() tasks: Task[]

  @Output() check: EventEmitter<CheckEvent> = new EventEmitter<CheckEvent>()
  @Output() delete: EventEmitter<number> = new EventEmitter<number>()

  constructor() { }

  ngOnInit() {
  }
}
