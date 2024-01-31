import { type App } from 'vue'
import SDesc from '../components/SDesc.vue'
import SDescAvatar from '../components/SDescAvatar.vue'
import SDescDay from '../components/SDescDay.vue'
import SDescEmpty from '../components/SDescEmpty.vue'
import SDescFile from '../components/SDescFile.vue'
import SDescItem from '../components/SDescItem.vue'
import SDescLabel from '../components/SDescLabel.vue'
import SDescLink from '../components/SDescLink.vue'
import SDescNumber from '../components/SDescNumber.vue'
import SDescPill from '../components/SDescPill.vue'
import SDescState from '../components/SDescState.vue'
import SDescText from '../components/SDescText.vue'

export function mixin(app: App): void {
  app.component('SDesc', SDesc)
  app.component('SDescAvatar', SDescAvatar)
  app.component('SDescDay', SDescDay)
  app.component('SDescEmpty', SDescEmpty)
  app.component('SDescFile', SDescFile)
  app.component('SDescItem', SDescItem)
  app.component('SDescLabel', SDescLabel)
  app.component('SDescLink', SDescLink)
  app.component('SDescNumber', SDescNumber)
  app.component('SDescPill', SDescPill)
  app.component('SDescState', SDescState)
  app.component('SDescText', SDescText)
}

declare module 'vue' {
  export interface GlobalComponents {
    SDesc: typeof SDesc
    SDescAvatar: typeof SDescAvatar
    SDescDay: typeof SDescDay
    SDescEmpty: typeof SDescEmpty
    SDescFile: typeof SDescFile
    SDescItem: typeof SDescItem
    SDescLabel: typeof SDescLabel
    SDescLink: typeof SDescLink
    SDescNumber: typeof SDescNumber
    SDescPill: typeof SDescPill
    SDescState: typeof SDescState
    SDescText: typeof SDescText
  }
}
