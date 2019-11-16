import {Injectable} from '@angular/core'
import {toast, Toast} from 'materialize-css'

type colorType = 'info' | 'warning' | 'danger' | 'success'

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  open(massage, color: colorType = 'info') {
    const classes = ['messageToast']

    switch (color) {
      case 'info':
        classes.push('black')
        break
      case 'warning':
        classes.push('yellow')
        classes.push('darken-3')
        break
      case 'danger':
        classes.push('red')
        classes.push('darken-3')
        break
      case 'success':
        classes.push('green')
        classes.push('darken-3')
    }

    Toast.dismissAll()
    toast({
      html: `<p>${massage}</p>`,
      inDuration: 800,
      classes: classes.join(' '),
      displayLength: 2000
    })
  }
}
