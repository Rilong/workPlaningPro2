import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core'
import {Modal} from 'materialize-css'
import {ModalInstance} from '../../interfaces/modal'
import {ProjectService} from '../../services/project/project.service'
import {Subscription} from 'rxjs'
import {ToastService} from '../../services/toast.service'
import {Project} from '../../interfaces/project'

@Component({
  selector: 'app-creation-project',
  templateUrl: './creation-project.component.html',
  styleUrls: ['./creation-project.component.sass']
})
export class CreationProjectComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('createProjectModal') modal: ElementRef
  @ViewChild('projectNameInput') input: ElementRef<HTMLInputElement>
  @Output() add: EventEmitter<Project> = new EventEmitter<Project>()

  pSub: Subscription
  modalInstance: ModalInstance = null
  loading = false
  projectName = ''

  constructor(private projectService: ProjectService, private toastService: ToastService) {
  }

  ngOnInit() {
  }

  openProjectModal() {
    this.modalInstance.open()
    this.input.nativeElement.focus()
  }

  closeProjectModal() {
    this.modalInstance.close()
  }

  submit() {
    if (this.projectName.trim() && !this.loading) {
      this.loading = true
      this.pSub = this.projectService.create(this.projectName)
        .subscribe((project: Project) => {
          this.loading = false
          this.add.emit(project)
          this.toastService.open('Проект створенно', 'success')
          this.closeProjectModal()
        }, (e) => {
          console.log(e)
          this.loading = false
          this.toastService.open('Помилка', 'danger')
        })
    }
  }

  ngAfterViewInit(): void {
    this.modalInstance = Modal.init(this.modal.nativeElement, {
      endingTop: '50%',
      onCloseEnd: () => this.projectName = ''
    })
  }

  ngOnDestroy(): void {
    if (this.modalInstance) {
      this.modalInstance.destroy()
    }

    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }
}
