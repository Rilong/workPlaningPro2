import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {ProjectService} from '../../shared/services/project/project.service'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {TaskService} from '../../shared/services/task/task.service'
import {ProjectAll} from '../../shared/interfaces/projectAll'
import {Project} from '../../shared/interfaces/project'
import {Task} from '../../shared/interfaces/task'
import {Modal} from 'materialize-css'
import {ModalInstance} from '../../shared/interfaces/modal'
import {Day} from '../../shared/interfaces/calendar/day'
import {environment} from '../../../environments/environment'

type calendarType = 'project_start' | 'project_finish'

interface Calendar {
  day: Day
  type: calendarType
  value?: any
  loading: boolean
}

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.sass']
})
export class ProjectPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('calendarModal') calendarModal: ElementRef<HTMLDivElement>
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>
  @ViewChild('descArea') descArea: ElementRef<HTMLTextAreaElement>

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
    type: null,
    value: null,
    loading: false
  }

  constructor(
    private projectService: ProjectService,
    public taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.loading = true

      this.projectService.getById(+params.id).subscribe(project => {
        this.project = project
        this.taskService.getAllByProject(+params.id).subscribe(tasks => {
          this.taskService.tasks = tasks
          this.loading = false
        }, () => this.loading = false)
      }, () => this.loading = false)
    })
  }

  ngAfterViewInit(): void {
    this.calendarModalInstance = Modal.init(this.calendarModal.nativeElement, {
      onCloseEnd: () => {
        this.calendar = {
          day: null,
          type: null,
          value: null,
          loading: false
        }
      }
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
    if (!this.nameLoading) {
      this.showEditName = false
      this.project.name = name
      this.nameLoading = true

      this.projectService.update(this.project.id, {name}).subscribe(
        () => this.nameLoading = false,
        () => this.nameLoading = false
      )
    }
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

  calendarChooseOpen(type: calendarType = null) {
    this.calendar.type = type
    this.calendarModalInstance.open()
  }

  calendarChooserClose() {
    this.calendarModalInstance.close()
  }

  calendarChooserApply() {
    const date = this.calendar.day.value.format(environment.server_date_format)
    this.calendar.loading = true

    if (this.calendar.type === 'project_start') {
      this.projectService.update(this.project.id, {start_date: date}).subscribe(
        () => {
          this.calendar.loading = false
          this.project.start_date = date
          this.calendarChooserClose()
        },
        () => this.calendar.loading = false
      )
    }

    if (this.calendar.type === 'project_finish') {
      this.projectService.update(this.project.id, {deadline_date: date}).subscribe(
        () => {
          this.calendar.loading = false
          this.project.deadline_date = date
          this.calendarChooserClose()
        },
        () => this.calendar.loading = false
      )
    }
  }

  /*
  *
  * Close a project
  * */

  close() {
    this.router.navigate(['/'])
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
