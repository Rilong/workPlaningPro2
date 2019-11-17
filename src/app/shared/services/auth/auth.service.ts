import {Injectable} from '@angular/core'
import {RegisterData} from '../../interfaces/registerData'
import {Observable, of, throwError} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../../environments/environment'
import {ServerMessage} from '../../interfaces/serverMessage'
import {catchError, tap} from 'rxjs/operators'
import {ToastService} from '../toast.service'
import {Token} from '../../interfaces/token'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private toastService: ToastService) {
  }

  public register(formData: RegisterData): Observable<ServerMessage> {
    return this.http.post<ServerMessage>(`${environment.server_url}/register`, formData)
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

  public login(email: string, password: string): Observable<Token> {
    return this.http.post<Token>(`${environment.server_url}/login`, {email, password})
      .pipe(
        tap((token: Token) => {
          this.saveToken(token)
        }),
      )
  }

  public isAuthenticated() {
    return false
  }

  private saveToken(token: Token) {
    localStorage.setItem('token', token.access_token)
  }

  private getToken() {
    return localStorage.getItem('token')
  }
}
