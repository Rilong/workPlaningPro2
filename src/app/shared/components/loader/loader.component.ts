import {Component, Input, OnInit} from '@angular/core'

type loaderType = 'indeterminate' | 'spinner'
type loaderSize = '' | 'small' | 'big'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass']
})
export class LoaderComponent implements OnInit {

  @Input() show = false
  @Input() type: loaderType = 'indeterminate'
  @Input() size: loaderSize = ''

  constructor() { }

  ngOnInit() {
  }

}
