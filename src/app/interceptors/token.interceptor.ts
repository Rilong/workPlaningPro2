import {Injectable} from '@angular/core'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable, throwError} from 'rxjs'
import {AuthService} from '../shared/services/auth/auth.service'
import {catchError} from 'rxjs/operators'
import {Router} from '@angular/router'
import {LoadingService} from '../shared/services/loading.service'
import {ToastService} from '../shared/services/toast.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private router: Router,
              private loadingService: LoadingService,
              private toastService: ToastService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.hasToken()) {
      console.log('interceptor')
      return next.handle(req.clone({
        headers: req.headers.append('Authorization', `Bearer ${this.authService.getToken()}`)
      })).pipe(catchError(err => {
        if (err.error === 'Token is expired') {
          this.loadingService.userLoading = false
          this.authService.clearToken()
          this.router.navigate(['/login'], {
            queryParams: {expired: true}
          })
        }

        return throwError(err)
      }))
    }

    return next.handle(req)
  }

}
