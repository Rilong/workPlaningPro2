import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {Modal} from 'materialize-css'
import {ModalInstance} from '../../shared/interfaces/modal'

@Component({
  selector: 'app-background-settings',
  templateUrl: './background-settings.component.html',
  styleUrls: ['./background-settings.component.sass']
})
export class BackgroundSettingsComponent implements OnInit, AfterViewInit, OnDestroy {

  private modalInstance: ModalInstance = null
  @ViewChild('bgModal') modal: ElementRef<HTMLDivElement>

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.modalInstance = Modal.init(this.modal.nativeElement)
  }

  openModal() {
    this.modalInstance.open()
  }

  ngOnDestroy(): void {
    if (this.modalInstance) {
      this.modalInstance.destroy()
    }
  }

}
