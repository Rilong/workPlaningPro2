import {Injectable} from '@angular/core'
import {RegisterData} from '../../interfaces/registerData'
import {Observable, of, throwError} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../../environments/environment'
import {ServerMessage} from '../../interfaces/serverMessage'
import {catchError} from 'rxjs/operators'
import {ToastService} from '../toast.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private toastService: ToastService) {
  }

  public register(formData: RegisterData): Observable<ServerMessage> {
    const url = environment.server_url
    return this.http.post<ServerMessage>(`${url}/register`, formData)
      .pipe(
        catchError((err, caught) => {
          switch (err.error.message) {
            case 'The email has already been taken.':
              this.toastService.open('Користувач з таким e-mail вже існує', 'danger')
              break
          }
          return throwError(err)
        })
      )
  }

  public isAuthenticated() {
    return false
  }
}
