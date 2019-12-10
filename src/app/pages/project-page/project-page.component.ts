import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
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

  /*
  *
  * Task
  * */

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

  /*
  *
  * Calendar
  * */

  calendarChoose(id: number) {
    this.calendar.taskId = id
    this.calendarChooseOpen()
  }

  calendarChooseOpen() {
    console.log(!!this.calendar.day)
    this.calendarModalInstance.open()
  }

  calendarChooserClose() {
    this.calendarModalInstance.close()
  }

  calendarChooserApply() {
    const deadline_date = this.calendar.day.value.format('YYYY-MM-DD HH:mm:SS')
    this.calendar.loading = true

    this.taskService.update(this.project.id, this.calendar.taskId, {deadline_date})
      .subscribe(() => {
        const taskIndex = this.tasks.findIndex((ts) => ts.id === this.calendar.taskId)

        this.tasks[taskIndex].deadline_date = deadline_date
        this.calendar.loading = false
        this.calendar.taskId = null
        this.calendar.day.selected = false
        this.calendar.day = null

        this.toastService.open('Дату встановлено', 'success')
        this.calendarChooserClose()
      }, () => this.calendar.loading = false)
  }


  calendarSelect(day: Day) {
    this.calendar.day = day
  }

  ngOnDestroy(): void {
    if (this.calendarModalInstance) {
      this.calendarModalInstance.destroy()
    }
  }
}
