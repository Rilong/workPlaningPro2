export interface Task {
  id?: number
  title?: string
  project_id?: number
  parent_id?: number
  is_done?: number
  deadline_date?: string
  finished_date?: string
  show_control?: boolean
}
