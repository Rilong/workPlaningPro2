import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Task} from '../../interfaces/task'
import {environment} from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAllByUser(userId: number, date: string): Observable<Task[]> {
    const params = new HttpParams()
      .set('date', encodeURI(date))
    return this.http.get<Task[]>(`${environment.server_url}/user/${userId}/tasks`, {params})
  }

  getAllByProject(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.server_url}/projects/${projectId}/tasks`)
  }

  create(projectId: number, task: Task): Observable<Task> {
    return this.http.post<Task>(`${environment.server_url}/projects/${projectId}/tasks`, task)
  }

  update(projectId: number, taskId: number, data: Task): Observable<string> {
    return this.http.put<string>(`${environment.server_url}/projects/${projectId}/tasks/${taskId}`, data)
  }

  toggleCheck(projectId: number, taskId: number, data: {check: boolean}): Observable<string> {
    return this.http.put<string>(`${environment.server_url}/projects/${projectId}/tasks/${taskId}/toggleCheck`, data)
  }

  delete(projectId: number, taskId: number): Observable<string> {
    return this.http.delete<string>(`${environment.server_url}/projects/${projectId}/tasks/${taskId}`)
  }
}
