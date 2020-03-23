import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import {UnsplashPhoto} from '../../interfaces/unsplash'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {environment} from '../../../../environments/environment'
import Settings from '../../interfaces/settings'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public open = false
  public settings: Settings = {
    background: null
  }

  constructor(private http: HttpClient) { }

  getPhotos(page: number = 1): Observable<Array<UnsplashPhoto>> {
    const perPage = 20
    let headers = new HttpHeaders()
    headers = headers.append('Authorization', `Client-ID ${environment.unsplash_api_key}`)

    return this.http.get<Array<UnsplashPhoto>>(`https://api.unsplash.com/photos?page=${page}&per_page=${perPage}`, {headers})
  }

  setPhotoParams(url: string, params: Object): string {
    let strParams = ''
    Object.keys(params).forEach(key => {
      strParams += `&${key}=${params[key]}`
    })

    return url + strParams
  }

  changeSettings(settings: Object): Observable<Object> {
    return this.http.post<Object>(`${environment.server_url}/user/settings`, {settings})
  }

  removeSettings(settings: Object): Observable<Object> {
    return this.http.put<Object>(`${environment.server_url}/user/settings`, {settings})
  }

  setSettings(settings: Settings) {
    if (settings && typeof settings === 'object') {
      this.settings = settings
    }
  }

  clearSettings(): void {
    this.settings = {
      background: null
    }
  }
}
