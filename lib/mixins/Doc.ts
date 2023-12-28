import { type App } from 'vue'
import SDoc from '../components/SDoc.vue'
import SDocSection from '../components/SDocSection.vue'

export function mixin(app: App): void {
  app.component('SDoc', SDoc)
  app.component('SDocSection', SDocSection)
}

declare module 'vue' {
  export interface GlobalComponents {
    SDoc: typeof SDoc
    SDocSection: typeof SDocSection
  }
}
