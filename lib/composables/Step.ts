export interface Step {
  status: StepStatus
  text?: string
}

export type StepStatus = 'upcoming' | 'active' | 'done' | 'failed'
export type BarMode = 'mute' | 'active'
