import {FormControl, ValidationErrors, ValidatorFn} from '@angular/forms'

export default class MyValidators {
  static confirm(valueFirst: string, valueSecond: string): ValidatorFn {
    return (control: FormControl): ValidationErrors | null => {
      const value = control.get(valueFirst)
      const valueConfirm = control.get(valueSecond)
      const errorName = `${valueFirst}Confirmed`

      return value && valueConfirm && value.value !== valueConfirm.value ? {
        [errorName]: true
      } : null
    }
  }
}
