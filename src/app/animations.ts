import {animate, animation, style} from '@angular/animations'

export const slideUp = animation([
  style({
    transform: 'translateY(100%)'
  }),
  animate('{{ time }}')
])

export const slideDown = animation([
  animate('{{ time }}', style({
    transform: 'translateY(100%)'
  }))
])