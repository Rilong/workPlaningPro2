import {Component, OnInit} from '@angular/core'
import {AuthService} from '../shared/services/auth/auth.service'
import {ToastService} from '../shared/services/toast.service'
import {Router} from '@angular/router'
import {fakeAsync} from '@angular/core/testing'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  logoutLoading = false

  constructor(public authService: AuthService, private toastService: ToastService, private router: Router) {
  }

  ngOnInit() {
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
}
