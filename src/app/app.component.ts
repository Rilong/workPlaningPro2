import {Component} from '@angular/core'
import {UserService} from './shared/services/user/user.service'
import * as moment from 'moment'
import {SettingsService} from './shared/services/settings/settings.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(public userService: UserService, public settingsService: SettingsService) {
    moment.locale('uk')
  }
}
