import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'moment',
  pure: false
})
export class MomentPipe implements PipeTransform {

  transform(date: moment.Moment, format = 'D MMM YYYY'): any {
    return date.format(format);
  }

}
