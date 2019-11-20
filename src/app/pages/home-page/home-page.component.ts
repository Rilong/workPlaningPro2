import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {Modal} from 'materialize-css'
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('createProjectModal', {static: false}) modal: ElementRef
  modalInstance = null

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.modalInstance = Modal.init(this.modal.nativeElement, {
      endingTop: '50%'
    })
  }

  ngOnDestroy(): void {
    if (this.modalInstance) {
      this.modalInstance.destroy()
    }
  }

  openProjectModal() {
    this.modalInstance.open()
  }
}
