import MutationObserver from 'mutation-observer'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import PortalVue, { Wormhole } from 'portal-vue'
import Sefirot from 'sefirot/store/Sefirot'
import SPortalModals from 'sefirot/components/SPortalModals.vue'

global.MutationObserver = MutationObserver
Wormhole.trackInstances = false

describe('components/SDialog', () => {
  it('opens and closes a confirm dialog', async () => {
    const { localVue, store, wrapper } = setup()

    store.dispatch('dialog/open', {
      title: 'Dialog title.',
      text: 'Dialog message.',
      actions: [
        { type: 'mute', label: 'MUTE ACTION', callback: () => {} },
        { type: 'text', label: 'TEXT ACTION', callback: () => {} }
      ]
    })

    await localVue.nextTick()

    expect(wrapper.findAll('.SDialog').length).toBe(1)

    store.dispatch('dialog/close')
  })

  it('can opens and closes a loading dialog', async () => {
    const { localVue, store, wrapper } = setup()

    store.dispatch('dialog/open', {
      type: 'loading',
      title: 'Dialog title.',
      text: 'Dialog message.'
    })

    await localVue.nextTick()

    expect(wrapper.findAll('.SDialog').length).toBe(1)

    store.dispatch('dialog/close')
  })

  it('can opens and closes a loading only dialog', async () => {
    const { localVue, store, wrapper } = setup()

    store.dispatch('dialog/open', {
      type: 'loading'
    })

    await localVue.nextTick()

    expect(wrapper.findAll('.SDialog').length).toBe(1)

    store.dispatch('dialog/close')
  })

  it('can opens and closes a progress dialog', async () => {
    const { localVue, store, wrapper } = setup()

    store.dispatch('dialog/open', {
      type: 'progress',
      title: 'Dialog title.',
      text: 'Dialog message.',
      progress: { now: 0, max: 100 }
    })

    await localVue.nextTick()

    expect(wrapper.findAll('.SDialog').length).toBe(1)

    store.dispatch('dialog/update', {
      progress: { now: 50, max: 100 }
    })

    await localVue.nextTick()

    expect(wrapper.findAll('.SDialog').length).toBe(1)
  })
})

function setup () {
  const localVue = createLocalVue()

  localVue.use(Vuex)
  localVue.use(PortalVue)

  const store = new Vuex.Store({
    plugins: [Sefirot]
  })

  const wrapper = mount(SPortalModals, { localVue, store })

  return {
    localVue,
    store,
    wrapper
  }
}
