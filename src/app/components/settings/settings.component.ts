import { Component, OnInit } from '@angular/core';
import {transition, trigger, useAnimation} from '@angular/animations'
import {slideDown, slideUp} from '../../animations'
import {SettingsService} from '../../shared/services/settings/settings.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
  animations: [
    trigger('slideUp', [
      transition('void => *', useAnimation(slideUp, {
        params: {
          time: '350ms ease'
        }
      })),
      transition('* => void', useAnimation(slideDown, {
        params: {
          time: '350ms ease'
        }
      }))
    ])
  ]
})
export class SettingsComponent implements OnInit {

  constructor(public settingsService: SettingsService) { }

  ngOnInit(): void {
  }

}
