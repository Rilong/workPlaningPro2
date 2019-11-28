import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {ProjectService} from '../../shared/services/project/project.service'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {TaskService} from '../../shared/services/task/task.service'
import {ProjectAll} from '../../shared/interfaces/projectAll'
import {Project} from '../../shared/interfaces/project'
import {Task} from '../../shared/interfaces/task'
import {CheckEvent} from '../../shared/interfaces/checkEvent'

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.sass']
})
export class ProjectPageComponent implements OnInit {

  @ViewChild('nameInput', {static: false}) nameInput: ElementRef<HTMLInputElement>
  @ViewChild('descArea', {static: false}) descArea: ElementRef<HTMLTextAreaElement>

  project: Project
  tasks: Task[]
  loading = false
  showEditName = false
  showEditDesc = false

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loading = true
    this.route.params.subscribe((params: Params) => {
      this.projectService.getByIdAll(+params.id)
        .subscribe((projectAll: ProjectAll) => {
          this.loading = false
          this.project = projectAll.project
          this.tasks = projectAll.tasks
          console.log(this.tasks)
      }, () => this.loading = false)
    })
  }

  editName() {
    this.showEditName = true
    setTimeout(() => this.nameInput.nativeElement.focus(), 0)
  }

  saveName(name: string) {
    this.showEditName = false
    this.project.name = name
    this.projectService.update(this.project.id, {name}).subscribe()
  }

  editDesc() {
    this.showEditDesc = true
    setTimeout(() => this.descArea.nativeElement.focus(), 0)
  }

  saveDesc(desc: string) {
    this.showEditDesc = false
    this.project.description = desc
    this.projectService.update(this.project.id, {description: desc}).subscribe()
  }

  checkToggle(check: CheckEvent) {
    const taskIndex = this.tasks.findIndex((ts) => ts.id === check.id)

    this.taskService.toggleCheck(this.project.id, check.id, {check: check.checked})
      .subscribe((response: string) => console.log(response)) // Don't forget to remove a log

    this.tasks[taskIndex].is_done = check.checked ? 1 : 0
  }

  taskDelete(id: number) {
    this.taskService.delete(this.project.id, id)
      .subscribe((response) => console.log(response)) // Don't forget to remove a log
    this.tasks = this.tasks.filter((ts) => ts.id !== id)
  }
}
