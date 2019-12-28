import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {ProjectService} from '../../shared/services/project/project.service'
import {ActivatedRoute, Params} from '@angular/router'
import {TaskService} from '../../shared/services/task/task.service'
import {ProjectAll} from '../../shared/interfaces/projectAll'
import {Project} from '../../shared/interfaces/project'
import {Task} from '../../shared/interfaces/task'
import {CheckEvent} from '../../shared/interfaces/checkEvent'
import {EditEvent} from '../../shared/interfaces/editEvent'
import {Modal} from 'materialize-css'
import {ModalInstance} from '../../shared/interfaces/modal'
import {Day} from '../../shared/interfaces/calendar/day'
import {ToastService} from '../../shared/services/toast.service'
import {CalendarChooseEvent} from '../../shared/interfaces/СalendarChooseEvent'
import {environment} from '../../../environments/environment'

interface Calendar {
  day: Day
  taskId: number
  loading: boolean
}

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.sass']
})
export class ProjectPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('calendarModal', {static: false}) calendarModal: ElementRef<HTMLDivElement>
  @ViewChild('nameInput', {static: false}) nameInput: ElementRef<HTMLInputElement>
  @ViewChild('descArea', {static: false}) descArea: ElementRef<HTMLTextAreaElement>

  project: Project
  tasks: Task[]
  loading = false
  tasksLoading = false
  nameLoading  = false
  descLoading  = false
  showEditName = false
  showEditDesc = false
  calendarModalInstance: ModalInstance = null
  calendar: Calendar = {
    day: null,
    taskId: null,
    loading: false
  }

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private toastService: ToastService
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
  }

  ngAfterViewInit(): void {
    this.calendarModalInstance = Modal.init(this.calendarModal.nativeElement, {
      onCloseEnd: el => this.calendar.taskId = null
    })
  }

  editName() {
    this.showEditName = true
    setTimeout(() => this.nameInput.nativeElement.focus(), 0)
  }

  /*
  *
  * Description
  * */

  saveName(name: string) {
    this.showEditName = false
    this.project.name = name
    this.nameLoading = true

    this.projectService.update(this.project.id, {name}).subscribe(
      () => this.nameLoading = false,
      () => this.nameLoading = false
    )
  }

  editDesc() {
    this.showEditDesc = true
    setTimeout(() => this.descArea.nativeElement.focus(), 0)
  }

  saveDesc(desc: string) {
    this.showEditDesc = false
    this.project.description = desc
    this.descLoading = true

    this.projectService.update(this.project.id, {description: desc}).subscribe(
      () => this.descLoading = false,
      () => this.descLoading = false
    )
  }

  /*
  *
  * Task
  * */

  checkToggle(check: CheckEvent) {
    const taskIndex = this.tasks.findIndex((ts) => ts.id === check.id)
    this.tasksLoading = true

    this.taskService.toggleCheck(this.project.id, check.id, {check: check.checked})
      .subscribe(
        () => this.tasksLoading = false,
        () => this.tasksLoading = false
      )

    this.tasks[taskIndex].is_done = check.checked ? 1 : 0
  }

  taskDelete(id: number) {
    this.tasksLoading = true

    if (id > 0) {
      this.taskService.delete(this.project.id, id)
        .subscribe(
          () => this.tasksLoading = false,
          () => this.tasksLoading = false
        )
    }

    this.tasks = this.tasks.filter((ts) => ts.id !== id)
  }

  taskAdd() {
    const newTask: Task = {
      id: 0,
      user_id: this.project.user_id,
      title: '',
      is_done: 0,
      show_edit: true,
    }
    this.tasks.push(newTask)
  }


  taskAddSave(task: Task) {
    const idx = this.tasks.findIndex(ts => ts.id === task.id)
    this.tasksLoading = true

    this.taskService.create(this.project.id, task).subscribe((task) => {
      this.tasksLoading = false
      this.tasks[idx] = task
    }, () => this.tasksLoading = false)

  }

  taskEdit(values: EditEvent) {
    const idx = this.tasks.findIndex(ts => ts.id === values.id)
    this.tasks[idx].title = values.value
    this.tasksLoading = true
    this.taskService.update(this.project.id, this.tasks[idx].id, {title: values.value})
      .subscribe(
        () => this.tasksLoading = false,
        () => this.tasksLoading = false
      )
  }

  taskUpdate(tasks: Task[]) {
    this.tasks = tasks
  }

  /*
  *
  * Calendar
  * */


  calendarSelect(day: Day) {
    this.calendar.day = day
  }

  calendarChooseOpen() {
    console.log(!!this.calendar.day)
    this.calendarModalInstance.open()
  }

  calendarChooserClose() {
    this.calendarModalInstance.close()
  }

  /**
   *
   * Loading the project
   */

  isLoading(): boolean {
    return this.loading || this.nameLoading || this.descLoading || this.tasksLoading || this.calendar.loading
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: Event) {
    $event.preventDefault()

    if (this.isLoading()) {
      $event.returnValue = true
    }
  }

  ngOnDestroy(): void {
    if (this.calendarModalInstance) {
      this.calendarModalInstance.destroy()
    }
  }
}
