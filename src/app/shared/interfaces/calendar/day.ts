import * as moment from 'moment'

export interface Day {
  value: moment.Moment
  active: boolean
  selected: boolean
  disabled: boolean
}
