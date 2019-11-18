import {Injectable} from '@angular/core'
import {RegisterData} from '../../interfaces/registerData'
import {Observable, throwError} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../../environments/environment'
import {ServerMessage} from '../../interfaces/serverMessage'
import {catchError, tap} from 'rxjs/operators'
import {ToastService} from '../toast.service'
import {UserService} from '../user/user.service'
import {LoginResponse} from '../../interfaces/loginResponse'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private toastService: ToastService, private userService: UserService) {
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
        }),
        catchError((err, caught) => {
          this.toastService.open('Невірний E-mail або пароль', 'danger')
          return throwError(err)
        })
      )
  }

  public isAuthenticated() {
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
