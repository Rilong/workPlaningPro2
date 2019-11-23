export interface Task {
  id?: number
  title?: string
  project_id?: number
  parent_id?: number
  is_done?: boolean
  deadline_date: string
  finished_date: string
}
