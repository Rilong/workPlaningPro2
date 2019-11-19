import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../../environments/environment'
import {User} from '../../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loading = false
  private user: User = null

  constructor(private http: HttpClient) {
  }

  public userFromServer(): Observable<User> {
    return this.http.get<User>(`${environment.server_url}/user`)
  }

  public hasUser(): boolean {
    return !!this.user
  }

  public getUser(): User {
    return this.user
  }

  public setUser(user): void {
    this.user = user
  }
}
