import {Injectable} from '@angular/core'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable} from 'rxjs'
import {AuthService} from '../shared/services/auth/auth.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.hasToken()) {
      return next.handle(req.clone({
        headers: req.headers.append('Authorization', `bearer ${this.authService.getToken()}`)
      }))
    }

    return next.handle(req)
  }

}
