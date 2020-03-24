import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  pure: false
})
export class ReversePipe implements PipeTransform {

  transform<T>(value: Array<T>, clone = false): Array<T> {
    if (clone) {
      return [...value].reverse()
    }

    return value.reverse()
  }

}
