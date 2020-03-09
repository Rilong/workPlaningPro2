import {Injectable} from '@angular/core'
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router'
import {Observable} from 'rxjs'
import {AuthService} from './services/auth/auth.service'
import {UserService} from './services/user/user.service'
import {map, tap, finalize} from 'rxjs/operators'
import {User} from './interfaces/user'
import {SettingsService} from './services/settings/settings.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private settingsService: SettingsService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      return true
    } else if (this.authService.hasToken() && !this.userService.hasUser()) {
      this.userService.loading = true
      return this.userService.userFromServer()
        .pipe(
          tap((user: User) => {
            this.userService.setUser(user)
            this.settingsService.setSettings(user.settings)
          }),
          map(() => true),
          finalize(() => this.userService.loading = false)
        )
    }
    this.router.navigate(['/login'])
    return false
  }
}
