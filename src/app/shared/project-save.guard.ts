import { Injectable } from '@angular/core';
import {CanDeactivate} from '@angular/router'
import {ProjectPageComponent} from '../pages/project-page/project-page.component'

@Injectable({
  providedIn: 'root'
})
export class ProjectSaveGuard implements CanDeactivate<ProjectPageComponent> {
  canDeactivate(component: ProjectPageComponent): boolean {
    console.log('CanDeactivate', component.isLoading())
    if (component.isLoading()) {
      return confirm('Дані проекту зберагаються! Якщо ви вийдете з цієї сторінки, дані можуть бути втрачено.');
    }

    return true
  }


  
}
