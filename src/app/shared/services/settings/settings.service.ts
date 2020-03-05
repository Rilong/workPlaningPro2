import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import {UnsplashPhoto} from '../../interfaces/unsplash'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {environment} from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public open = false
  public image: string = null

  constructor(private http: HttpClient) { }

  getPhotos(page: number = 1): Observable<Array<UnsplashPhoto>> {
    const perPage = 20
    let headers = new HttpHeaders()
    headers = headers.append('Authorization', `Client-ID ${environment.unsplash_api_key}`)

    return this.http.get<Array<UnsplashPhoto>>(`https://api.unsplash.com/photos?page=${page}&per_page=${perPage}`, {headers})
  }
}
