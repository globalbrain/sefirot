import MutationObserver from 'mutation-observer'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import PortalVue, { Wormhole } from 'portal-vue'
import SWindowFull from './_fixtures/SWindowFull'
import SWindowBlank from './_fixtures/SWindowBlank'
import Sefirot from '@/store/Sefirot'

global.MutationObserver = MutationObserver
Wormhole.trackInstances = false

const localVue = createLocalVue()

localVue.use(Vuex)

localVue.use(PortalVue)

describe('Components - Windows - SWindow', () => {
  let store = {}

  beforeAll(() => {
    store = new Vuex.Store({
      plugins: [Sefirot]
    })
  })

  test('it can have title, lead and actions', async () => {
    const wrapper = mount(SWindowFull, { localVue, store })

    store.dispatch('window/open', {
      name: 's-window-full'
    })

    await localVue.nextTick()

    expect(wrapper.find('.SWindow .title').exists()).toBe(true)
    expect(wrapper.find('.SWindow .lead').exists()).toBe(true)
    expect(wrapper.find('.SWindow .actions').exists()).toBe(true)

    wrapper.find('.SWindow .actions .action .SButton').trigger('click')

    await localVue.nextTick()

    expect(wrapper.find('.SWindow').exists()).toBe(false)
  })

  test('it can be blank', async () => {
    const wrapper = mount(SWindowBlank, { localVue, store })

    store.dispatch('window/open', {
      name: 's-window-blank'
    })

    await localVue.nextTick()

    expect(wrapper.find('.SWindow .title').exists()).toBe(false)
    expect(wrapper.find('.SWindow .lead').exists()).toBe(false)
    expect(wrapper.find('.SWindow .actions').exists()).toBe(false)

    wrapper.find('.SWindow .close').trigger('click')
  })
})
