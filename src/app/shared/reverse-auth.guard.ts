import {Injectable} from '@angular/core'
import {Location} from '@angular/common'
import {CanLoad, Route, Router} from '@angular/router'
import {AuthService} from './services/auth/auth.service'


@Injectable({
  providedIn: 'root'
})
export class ReverseAuthGuard implements CanLoad {
  constructor(private authService: AuthService, private location: Location, private router: Router) {
  }

  canLoad(route: Route): boolean {
    if (this.authService.hasToken()) {
      this.router.navigate(['/'])
      return false
    } else {
      return true
    }
  }
}
