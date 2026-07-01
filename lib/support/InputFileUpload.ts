// The file/action shapes shared by SInputFileUpload and its item child.

import { type Component } from 'vue'
import { type Mode as ButtonMode } from '../components/SButton.vue'
import { type State as IndicatorState } from '../components/SIndicator.vue'

export interface FileObject {
  file: File
  indicatorState?: IndicatorState | null
  canRemove?: boolean
  action?: Action | null
  errorMessage?: string | null
}

export interface Action {
  mode?: ButtonMode
  icon?: Component
  leadIcon?: Component
  trailIcon?: Component
  label?: string
  onClick(): void
}
