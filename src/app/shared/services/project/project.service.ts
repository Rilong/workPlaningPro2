import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../../environments/environment'
import {Observable} from 'rxjs'
import {Project} from '../../interfaces/project'
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public projects: Project[] = []

  constructor(private http: HttpClient) {
  }

  create(name: string): Observable<Project> {
    return this.http.post(`${environment.server_url}/projects`, {name})
  }

  add(project: Project) {
    this.projects.push(project)
  }

  load(): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.server_url}/projects`)
      .pipe(
        tap((projects: Project[]) => this.projects = projects)
      )
  }
}
