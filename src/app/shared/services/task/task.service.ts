import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import {Observable, Subject} from 'rxjs'
import {Task} from '../../interfaces/task'
import {environment} from '../../../../environments/environment'
import {UserService} from '../user/user.service'

interface Filter {
  date?: string
  date_month?: string
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = []
  tasksChange: Subject<null> = new Subject<null>()

  constructor(private http: HttpClient, private userService: UserService) { }

  getAllByUser(userId: number, filter: Filter): Observable<Task[]> {
    let params = new HttpParams()

    if (filter.date_month) {
      params = params.append('date_month', encodeURI(filter.date_month))
    }

    if (filter.date) {
      params = params.append('date', encodeURI(filter.date))
    }
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

  addNewTask(projectId: number = null) {
    const newTask: Task = {
      id: 0,
      user_id: this.userService.getUser().id,
      title: '',
      is_done: 0,
      show_edit: true,
      show_control: null,
      project_id: projectId
    }
    this.tasks.push(newTask)
    this.tasksChange.next()
  }

  calculatePercent(tasks: Task[] = null): number {
    const tasksReturn: Task[] = tasks ? tasks : this.tasks
    let total = 0
    let done = 0

    if (tasksReturn.length === 0) {
      return total
    }

    total = tasksReturn.length
    done = tasksReturn.reduce((acc, task) => task.is_done ? acc + 1: acc, 0)

    return Math.ceil(100 * done / total)
  }
}
