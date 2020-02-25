import {Component, OnInit} from '@angular/core'
import {AuthService} from '../../shared/services/auth/auth.service'
import {ToastService} from '../../shared/services/toast.service'
import {Router} from '@angular/router'
import * as moment from 'moment'
import {SettingsService} from '../../shared/services/settings/settings.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  now: moment.Moment
  logoutLoading = false

  constructor(public authService: AuthService,
              private settingsService: SettingsService,
              private toastService: ToastService,
              private router: Router) {
  }

  ngOnInit() {
    this.now = moment(new Date())
  }

  logout($event: MouseEvent) {
    $event.preventDefault()
    if (!this.logoutLoading) {
      this.logoutLoading = true
      this.authService.logout().subscribe(() => {
        this.logoutLoading = false
        this.authService.unauthorize()
        this.toastService.open('Ви успішно вийшли', 'success')
        this.router.navigate(['/login'])
      }, () => this.logoutLoading = false)
    }
  }

  openSettings(event: MouseEvent) {
    event.preventDefault()
    this.settingsService.open = true
  }
}
