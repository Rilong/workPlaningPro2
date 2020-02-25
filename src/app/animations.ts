import {animate, animation, style} from '@angular/animations'

export const slideLeft = animation([
  style({
    transform: 'translateX(100%)'
  }),
  animate('{{ time }}')
])

export const slideRight = animation([
  animate('{{ time }}', style({
    transform: 'translateX(100%)'
  }))
])