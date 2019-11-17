import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/services/user/user.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: UserService) { }

  ngOnInit() {
  }

}
