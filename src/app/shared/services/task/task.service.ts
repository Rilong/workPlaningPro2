import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import {Observable, Subject} from 'rxjs'
import {Task} from '../../interfaces/task'
import {environment} from '../../../../environments/environment'
import {UtilitiesService} from '../utilities/utilities.service'

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

  constructor(private http: HttpClient, public utilities: UtilitiesService) { }

  getAllByUser(filter: Filter): Observable<Task[]> {
    let params = new HttpParams()

    if (filter.date_month) {
      params = params.append('date_month', encodeURI(filter.date_month))
    }

    if (filter.date) {
      params = params.append('date', encodeURI(filter.date))
    }
    return this.http.get<Task[]>(`${environment.server_url}/tasks`, {params})
  }

  getAllByProject(projectId: number): Observable<Task[]> {
    let params = new HttpParams().append('project_id', projectId.toString())
    return this.http.get<Task[]>(`${environment.server_url}/tasks`, {params})
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(`${environment.server_url}/tasks`, this.utilities.removeFalsy(task))
  }

  update(taskId: number, task: Task): Observable<string> {
    return this.http.put<string>(`${environment.server_url}/tasks/${taskId}`, task)
  }

  toggleCheck(taskId: number): Observable<string> {
    return this.http.post<string>(`${environment.server_url}/tasks/${taskId}/check`, null)
  }

  delete(taskId: number): Observable<string> {
    return this.http.delete<string>(`${environment.server_url}/tasks/${taskId}`)
  }

  addNewTask(task: Task) {
    const newTask: Task = {
      id: 0,
      title: '',
      is_done: 0,
      show_edit: true,
      show_control: null,
      project_id: null,
      ...task
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
