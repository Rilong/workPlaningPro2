import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import {environment} from '../../../../environments/environment'
import {Observable} from 'rxjs'
import {Project} from '../../interfaces/project'
import {ProjectAll} from '../../interfaces/projectAll'
import {ToastService} from '../toast.service'
import {tap} from 'rxjs/operators'

interface Filters {
  tasks?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private toastService: ToastService) {}

  create(name: string): Observable<Project> {
    return this.http.post(`${environment.server_url}/projects`, {name})
  }

  getAll(filters: Filters = null): Observable<Project[]> {
    let params = new HttpParams()

    if (filters && filters.tasks) {
      params = params.append('tasks', '1')
    }

    return this.http.get<Project[]>(`${environment.server_url}/projects`, {params})
  }

  getById(id: number): Observable<Project> {
    return this.http.get(`${environment.server_url}/projects/${id}`)
  }

  getByIdAll(id: number): Observable<ProjectAll> {
    return this.http.get<ProjectAll>(`${environment.server_url}/projects/${id}/all`)
  }

  update(id: number, data: Project): Observable<string> {
    return this.http.put<string>(`${environment.server_url}/projects/${id}`, data)
      .pipe(
        tap(() => this.toastService.open('Проект оновлено', 'success'))
      )
  }
}
