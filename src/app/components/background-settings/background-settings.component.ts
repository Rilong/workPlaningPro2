import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {Modal} from 'materialize-css'
import {ModalInstance} from '../../shared/interfaces/modal'
import {Subscription} from 'rxjs'
import {SettingsService} from '../../shared/services/settings/settings.service'
import {UnsplashPhoto} from '../../shared/interfaces/unsplash'

@Component({
  selector: 'app-background-settings',
  templateUrl: './background-settings.component.html',
  styleUrls: ['./background-settings.component.sass']
})
export class BackgroundSettingsComponent implements OnInit, AfterViewInit, OnDestroy {

  public isOpen = false
  public isLoading = false
  public photos: Array<UnsplashPhoto> = []
  @ViewChild('bgModal') modal: ElementRef<HTMLDivElement>

  private PSub: Subscription = null
  private modalInstance: ModalInstance = null
  private page = 1

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.modalInstance = Modal.init(this.modal.nativeElement, {
      onCloseEnd: this.onCloseModal.bind(this),
      onOpenEnd: this.onOpenModal.bind(this)
    })
  }

  loadPhotos() {
    this.isLoading = true

    this.PSub = this.settingsService.getPhotos(this.page).subscribe(photos => {
      this.isLoading = false
      this.photos = [...this.photos, ...photos]
    }, () => this.isLoading = false)
  }

  selectPhoto(photo: UnsplashPhoto) {
    this.settingsService.settings.background = photo.urls.full
    this.settingsService.changeSettings(this.settingsService.settings)
      .subscribe()
  }

  scrollPhotos(event: Event) {
    const target = (event.target as HTMLDivElement)
    const isDown = (target.scrollHeight - target.scrollTop ) === target.clientHeight

    if (isDown) {
      this.page++
      this.loadPhotos()
    }
  }

  openModal() {
    this.modalInstance.open()
    this.isOpen = true
  }

  closeModal() {
    this.modalInstance.close()
    this.isOpen = false
  }

  onOpenModal(el: Element) {
    this.loadPhotos()
  }

  onCloseModal(el: Element) {
    this.isOpen = false
    this.photos = []

    if (this.PSub) {
      this.PSub.unsubscribe()
    }
  }

  ngOnDestroy(): void {
    if (this.modalInstance) {
      this.modalInstance.destroy()
    }
  }
}
