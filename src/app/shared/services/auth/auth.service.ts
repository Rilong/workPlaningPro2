import {Injectable} from '@angular/core'
import {RegisterData} from '../../interfaces/registerData'
import {Observable, throwError} from 'rxjs'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {environment} from '../../../../environments/environment'
import {ServerMessage} from '../../interfaces/serverMessage'
import {catchError, tap} from 'rxjs/operators'
import {ToastService} from '../toast.service'
import {UserService} from '../user/user.service'
import {LoginResponse} from '../../interfaces/loginResponse'
import {SettingsService} from '../settings/settings.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private toastService: ToastService,
              private userService: UserService,
              private settingsService: SettingsService) {
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

  public login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.server_url}/login`, {email, password})
      .pipe(
        tap(({token, user}) => {
          this.saveToken(token)
          this.userService.setUser(user)
          this.settingsService.setSettings(user.settings)
        }),
        catchError((err: HttpErrorResponse, caught) => {
          if (err.status === 401) {
            this.toastService.open('Невірний E-mail або пароль', 'danger')
          } else {
            this.toastService.open('Невідома помилка', 'danger')
          }
          return throwError(err)
        })
      )
  }

  public unauthorize() {
    this.clearToken()
    this.userService.clearUser()
    this.settingsService.clearSettings()
  }

  public logout(): Observable<string> {
    return this.http.post<string>(`${environment.server_url}/logout`, {})
  }

  public isAuthenticated(): boolean {
    return this.hasToken() && this.userService.hasUser()
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token)
  }

  public hasToken(): boolean {
    return !!this.getToken()
  }

  public getToken(): string {
    return localStorage.getItem('token')
  }

  public clearToken() {
    localStorage.removeItem('token')
  }
}
