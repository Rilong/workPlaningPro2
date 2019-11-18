import { Component } from '@angular/core';
import {LoadingService} from './shared/services/loading.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(public loadingService: LoadingService) {}
}
