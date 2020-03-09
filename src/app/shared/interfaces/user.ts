import Settings from './settings'

export interface User {
  id: number
  name: string
  email: string
  settings: Settings | null
}
