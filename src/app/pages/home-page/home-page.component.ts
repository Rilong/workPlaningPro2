import {Component, OnDestroy, OnInit} from '@angular/core'
import {ProjectService} from '../../shared/services/project/project.service'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit, OnDestroy {

  pSub: Subscription
  pLoading = false

  constructor(public projectService: ProjectService) {
  }

  ngOnInit() {
    this.pLoading = true
    this.pSub = this.projectService.load().subscribe(
      () => this.pLoading = false,
      () => this.pLoading = false
    )
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }
}
