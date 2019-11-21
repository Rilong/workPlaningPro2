import {Component, Input, OnInit} from '@angular/core'
import {Project} from '../../interfaces/project'

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.sass']
})
export class ProjectsListComponent implements OnInit {

  @Input() projects: Project[]

  constructor() {
  }

  ngOnInit() {
  }

}
