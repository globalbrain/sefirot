import { type App } from 'vue'
import SDataList from '../components/SDataList.vue'
import SDataListItem from '../components/SDataListItem.vue'

export function mixin(app: App): void {
  app.component('SDataList', SDataList)
  app.component('SDataListItem', SDataListItem)
}

declare module 'vue' {
  export interface GlobalComponents {
    SDataList: typeof SDataList
    SDataListItem: typeof SDataListItem
  }
}
