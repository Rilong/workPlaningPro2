import {Component, Input, OnInit} from '@angular/core'
import {Task} from '../../interfaces/task'

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.sass']
})
export class TasksListComponent implements OnInit {

  @Input() tasks: Task[]

  constructor() { }

  ngOnInit() {
  }

}
