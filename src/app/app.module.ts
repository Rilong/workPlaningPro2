import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {HomePageComponent} from './pages/home-page/home-page.component'
import {HeaderComponent} from './components/header/header.component'
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
import {CalendarChooserComponent} from './shared/components/calendar-chooser/calendar-chooser.component'
import {ToMomentPipe} from './shared/pipes/toMoment/to-moment.pipe'
import {CalendarViewPageComponent} from './pages/calendar-view-page/calendar-view-page.component'
import {SettingsComponent} from './components/settings/settings.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BackgroundSettingsComponent } from './components/background-settings/background-settings.component'
import {ReversePipe} from './shared/pipes/reverse/reverse.pipe'

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
    CalendarChooserComponent,
    CalendarViewPageComponent,
    SettingsComponent,
    BackgroundSettingsComponent,
    MomentPipe,
    ToMomentPipe,
    ReversePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
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
