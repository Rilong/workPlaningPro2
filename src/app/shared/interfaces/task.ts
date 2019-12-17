import {Project} from './project'

export interface Task {
  id?: number
  title?: string
  user_id?: number
  project_id?: number
  parent_id?: number
  is_done?: number
  deadline_date?: string
  finished_date?: string
  show_control?: boolean
  show_edit?: boolean
  project?: Project
}
