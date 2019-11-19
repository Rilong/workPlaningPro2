import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass']
})
export class LoaderComponent implements OnInit {

  @Input() show = false

  constructor() { }

  ngOnInit() {
  }

}
