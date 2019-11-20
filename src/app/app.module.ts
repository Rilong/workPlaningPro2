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

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    LoaderComponent,
    IconComponent
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
