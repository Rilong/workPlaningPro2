import {Component, OnDestroy, OnInit} from '@angular/core'
import {ProjectService} from '../../shared/services/project/project.service'
import {Subscription} from 'rxjs'
import {Project} from '../../shared/interfaces/project'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit, OnDestroy {

  pSub: Subscription
  pLoading = false
  projects: Project[] = []

  constructor(public projectService: ProjectService) {
  }

  ngOnInit() {
    this.pLoading = true
    this.pSub = this.projectService.getAll({tasks: true}).subscribe(
      (projects: Project[]) => {
        this.projects = projects
        this.pLoading = false
      },
      () => this.pLoading = false
    )
  }

  addProject(project: Project) {
    this.projects.push(project)
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }
}
