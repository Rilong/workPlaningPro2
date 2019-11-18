import {Injectable} from '@angular/core'
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router'
import {Observable, throwError} from 'rxjs'
import {AuthService} from './services/auth/auth.service'
import {UserService} from './services/user/user.service'
import {LoadingService} from './services/loading.service'
import {catchError, map, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private loadingService: LoadingService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      return true
    } else if (this.authService.hasToken() && !this.userService.hasUser()) {
      this.loadingService.userLoading = true
      console.log('guard')
      return this.userService.userFromServer()
        .pipe(
          catchError(err => {
            this.loadingService.userLoading = false
            this.authService.clearToken()
            this.router.navigate(['/login'])
            return throwError(err)
          }),
          tap((user) => {
            this.loadingService.userLoading = false
            this.userService.setUser(user)
          }),
          map(() => true)
        )
    }
    this.router.navigate(['/login'])
    return false
  }
}
