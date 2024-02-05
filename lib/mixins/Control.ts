import { type App } from 'vue'
import SControl from '../components/SControl.vue'
import SControlActionBar from '../components/SControlActionBar.vue'
import SControlActionBarButton from '../components/SControlActionBarButton.vue'
import SControlActionBarClose from '../components/SControlActionBarClose.vue'
import SControlActionBarCollapse from '../components/SControlActionBarCollapse.vue'
import SControlActionMenu from '../components/SControlActionMenu.vue'
import SControlButton from '../components/SControlButton.vue'
import SControlCenter from '../components/SControlCenter.vue'
import SControlInputSearch from '../components/SControlInputSearch.vue'
import SControlLeft from '../components/SControlLeft.vue'
import SControlPagination from '../components/SControlPagination.vue'
import SControlRight from '../components/SControlRight.vue'
import SControlText from '../components/SControlText.vue'

export function mixin(app: App): void {
  app.component('SControl', SControl)
  app.component('SControlActionBar', SControlActionBar)
  app.component('SControlActionBarButton', SControlActionBarButton)
  app.component('SControlActionBarClose', SControlActionBarClose)
  app.component('SControlActionBarCollapse', SControlActionBarCollapse)
  app.component('SControlActionMenu', SControlActionMenu)
  app.component('SControlButton', SControlButton)
  app.component('SControlCenter', SControlCenter)
  app.component('SControlInputSearch', SControlInputSearch)
  app.component('SControlLeft', SControlLeft)
  app.component('SControlPagination', SControlPagination)
  app.component('SControlRight', SControlRight)
  app.component('SControlText', SControlText)
}

declare module 'vue' {
  export interface GlobalComponents {
    SControl: typeof SControl
    SControlActionBar: typeof SControlActionBar
    SControlActionBarButton: typeof SControlActionBarButton
    SControlActionBarClose: typeof SControlActionBarClose
    SControlActionMenu: typeof SControlActionMenu
    SControlButton: typeof SControlButton
    SControlCenter: typeof SControlCenter
    SControlInputSearch: typeof SControlInputSearch
    SControlLeft: typeof SControlLeft
    SControlPagination: typeof SControlPagination
    SControlRight: typeof SControlRight
    SControlText: typeof SControlText
  }
}
