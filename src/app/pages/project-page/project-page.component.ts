import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {ProjectService} from '../../shared/services/project/project.service'
import {ActivatedRoute, Params} from '@angular/router'
import {TaskService} from '../../shared/services/task/task.service'
import {ProjectAll} from '../../shared/interfaces/projectAll'
import {Project} from '../../shared/interfaces/project'
import {Task} from '../../shared/interfaces/task'
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
    public taskService: TaskService,
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
          this.taskService.tasks = projectAll.tasks
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

  calendarChooserApply() {

  }

  /**
   *
   * Loading the project
   */

  isLoading(): boolean {
    return this.loading || this.nameLoading || this.descLoading || this.calendar.loading
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
    this.taskService.tasks = []
  }

}
