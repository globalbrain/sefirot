import { type App } from 'vue'
import SContent from '../components/SContent.vue'
import SDivider from '../components/SDivider.vue'
import SIcon from '../components/SIcon.vue'
import SLink from '../components/SLink.vue'
import SModal from '../components/SModal.vue'
import STrans from '../components/STrans.vue'
import { mixin as mixinCard } from './Card'
import { mixin as mixinControl } from './Control'
import { mixin as mixinDesc } from './Desc'
import { mixin as mixinDoc } from './Doc'
import { mixin as mixinGrid } from './Grid'
import { mixin as mixinHead } from './Head'

export function mixin(app: App): void {
  mixinCard(app)
  mixinControl(app)
  mixinDesc(app)
  mixinDoc(app)
  mixinGrid(app)
  mixinHead(app)

  app.component('SContent', SContent)
  app.component('SDivider', SDivider)
  app.component('SIcon', SIcon)
  app.component('SLink', SLink)
  app.component('SModal', SModal)
  app.component('STrans', STrans)
}

declare module 'vue' {
  export interface GlobalComponents {
    SContent: typeof SContent
    SDivider: typeof SDivider
    SIcon: typeof SIcon
    SLink: typeof SLink
    SModal: typeof SModal
    STrans: typeof STrans
  }
}
