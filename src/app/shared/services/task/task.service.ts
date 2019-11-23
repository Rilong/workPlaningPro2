import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Task} from '../../interfaces/task'
import {environment} from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAll(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.server_url}/projects/${projectId}/tasks`)
  }
}
