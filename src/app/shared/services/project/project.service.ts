import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../../environments/environment'
import {Observable} from 'rxjs'
import {Project} from '../../interfaces/project'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {
  }

  create(name: string): Observable<Project> {
    return this.http.post(`${environment.server_url}/projects`, {name})
  }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.server_url}/projects`)
  }
}
