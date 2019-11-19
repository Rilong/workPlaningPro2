import {Injectable} from '@angular/core'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable, throwError} from 'rxjs'
import {AuthService} from '../shared/services/auth/auth.service'
import {catchError} from 'rxjs/operators'
import {Router} from '@angular/router'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.hasToken()) {
      const handle = next.handle(req.clone({
        headers: req.headers.append('Authorization', `Bearer ${this.authService.getToken()}`)
      }))

      return handle.pipe(catchError(err => {
        if (err.status === 401) {
          this.authService.clearToken()

          if (err.error === 'Token is expired') {
            this.router.navigate(['/login'], {
              queryParams: {expired: true}
            })
          } else {
            this.router.navigate(['/login'])
          }
        }

        return throwError(err)
      }))
    }

    return next.handle(req)
  }

}
