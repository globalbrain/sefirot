import MutationObserver from 'mutation-observer'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import PortalVue from 'portal-vue'
import Sefirot from 'sefirot/store/Sefirot'
import SScreenMinimal from './_fixtures/SScreenMinimal.vue'

global.MutationObserver = MutationObserver

const localVue = createLocalVue()

localVue.use(Vuex)

localVue.use(PortalVue)

describe('Components - Screens - SScreen', () => {
  let store = {} as Store<{}>

  beforeAll(() => {
    store = new Vuex.Store({
      plugins: [Sefirot]
    })
  })

  test('it can open screen', async () => {
    const wrapper = mount(SScreenMinimal, { localVue, store })

    expect(wrapper.find('.SScreen').exists()).toBe(false)

    store.dispatch('screen/open', {
      name: 's-screen-minimal'
    })

    await localVue.nextTick()

    expect(wrapper.find('.SScreen').exists()).toBe(true)

    store.dispatch('screen/close')

    await localVue.nextTick()

    expect(wrapper.find('.SWindow').exists()).toBe(false)
  })
})
