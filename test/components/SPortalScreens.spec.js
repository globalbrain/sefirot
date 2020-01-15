import MutationObserver from 'mutation-observer'
import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import PortalVue from 'portal-vue'
import Sefirot from 'sefirot/store/Sefirot'
import SPortalScreens from 'sefirot/components/SPortalScreens'

global.MutationObserver = MutationObserver

Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true })

jest.useFakeTimers()

const localVue = createLocalVue()

localVue.use(Vuex)

localVue.use(VueRouter)

localVue.use(PortalVue)

describe('Components - Portals - SPortalScreens', () => {
  test('it can open and close a screen', async () => {
    const router = new VueRouter()

    const store = new Vuex.Store({
      plugins: [Sefirot]
    })

    const wrapper = mount(SPortalScreens, {
      localVue,
      router,
      store
    })

    store.dispatch('screen/open', {
      name: 'screen'
    })

    await localVue.nextTick()

    expect(wrapper.vm.screenName).toBe('screen')

    store.dispatch('screen/close')

    await localVue.nextTick()

    store.dispatch('screen/open', {
      name: 'screen'
    })

    wrapper.vm.$router.push('/another-path')

    await localVue.nextTick()

    expect(wrapper.vm.screenName).toBe(null)

    jest.runAllTimers()
  })
})
