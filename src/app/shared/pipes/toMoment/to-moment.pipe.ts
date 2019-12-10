import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'toMoment',
  pure: false
})
export class ToMomentPipe implements PipeTransform {

  transform(value: string | Date): moment.Moment {
    return moment(value)
  }

}
