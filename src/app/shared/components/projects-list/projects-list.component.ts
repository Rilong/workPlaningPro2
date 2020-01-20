import {Component, Input, OnInit} from '@angular/core'
import {Project} from '../../interfaces/project'
import * as moment from 'moment'

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.sass']
})
export class ProjectsListComponent implements OnInit {

  public now = moment(new Date())

  @Input() projects: Project[]

  constructor() {
  }

  ngOnInit() {
  }

  timeToFormat(date: moment.Moment) {
    if (!date.isValid()) {
      return null
    }

    if (date.isSame(this.now, 'days')) {
      return 'Сьогодні'
    }

    if (this.timeTo(date) >= 0) {
      return `Залишилось ${date.fromNow(true)}`
    }

    return 'Протермінований'
  }

  timeTo(date: moment.Moment) {
    return date.diff(this.now, 'days')
  }


}
