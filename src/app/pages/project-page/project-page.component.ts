import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {ProjectService} from '../../shared/services/project/project.service'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {TaskService} from '../../shared/services/task/task.service'
import {ProjectAll} from '../../shared/interfaces/projectAll'
import {Project} from '../../shared/interfaces/project'
import {Task} from '../../shared/interfaces/task'
import {CheckEvent} from '../../shared/interfaces/checkEvent'
import {EditEvent} from '../../shared/interfaces/editEvent'
import {Modal} from 'materialize-css'
import {ModalInstance} from '../../shared/interfaces/modal'
import * as moment from 'moment'

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.sass']
})
export class ProjectPageComponent implements OnInit, OnDestroy {

  @ViewChild('calendarModal', {static: false}) calendarModal: ElementRef<HTMLDivElement>
  @ViewChild('nameInput', {static: false}) nameInput: ElementRef<HTMLInputElement>
  @ViewChild('descArea', {static: false}) descArea: ElementRef<HTMLTextAreaElement>

  project: Project
  tasks: Task[]
  loading = false
  showEditName = false
  showEditDesc = false
  calendarModalInstance: ModalInstance = null
  calendarValue: moment.Moment = null

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
      }, () => this.loading = false)
    })
    this.calendarModalInstance = Modal.init(this.calendarModal.nativeElement)
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
      .subscribe()

    this.tasks[taskIndex].is_done = check.checked ? 1 : 0
  }

  taskDelete(id: number) {
    if (id > 0) {
      this.taskService.delete(this.project.id, id)
        .subscribe()
    }

    this.tasks = this.tasks.filter((ts) => ts.id !== id)
  }

  taskAdd() {
    const newTask: Task = {
      id: 0,
      title: '',
      is_done: 0,
      show_edit: true,
    }
    this.tasks.push(newTask)
  }


  taskAddSave(task: Task) {
    const idx = this.tasks.findIndex(ts => ts.id === task.id)

    this.taskService.create(this.project.id, task).subscribe((task) => {
      this.tasks[idx] = task
    })

  }

  taskEdit(values: EditEvent) {
    const idx = this.tasks.findIndex(ts => ts.id === values.id)
    this.tasks[idx].title = values.value
    this.taskService.update(this.project.id, this.tasks[idx].id, {title: values.value})
      .subscribe()
  }

  calendarChooserClose() {
    this.calendarModalInstance.close()
  }

  calendarChooserApply() {

  }

  ngOnDestroy(): void {
    if (this.calendarModalInstance) {
      this.calendarModalInstance.destroy()
    }
  }
}
