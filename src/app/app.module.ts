import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {HomePageComponent} from './pages/home-page/home-page.component'
import {HeaderComponent} from './header/header.component'
import {SharedModule} from './shared/shared.module'
import {HTTP_INTERCEPTORS} from '@angular/common/http'
import {TokenInterceptor} from './interceptors/token.interceptor'
import {LoaderComponent} from './shared/components/loader/loader.component'
import {IconComponent} from './shared/components/icon/icon.component'
import {CreationProjectComponent} from './shared/components/creation-project/creation-project.component'
import {ProjectsListComponent} from './shared/components/projects-list/projects-list.component'
import {TasksListComponent} from './shared/components/tasks-list/tasks-list.component'
import {ProjectPageComponent} from './pages/project-page/project-page.component'
import {CalendarPageComponent} from './pages/calendar-page/calendar-page.component'
import {MomentPipe} from './shared/pipes/moment/moment.pipe'

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProjectPageComponent,
    HeaderComponent,
    LoaderComponent,
    IconComponent,
    CreationProjectComponent,
    ProjectsListComponent,
    TasksListComponent,
    CalendarPageComponent,
    MomentPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
