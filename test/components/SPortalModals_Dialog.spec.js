import MutationObserver from 'mutation-observer'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import PortalVue, { Wormhole } from 'portal-vue'
import Sefirot from 'sefirot/store/Sefirot'
import SPortalModals from 'sefirot/components/SPortalModals'

global.MutationObserver = MutationObserver
Wormhole.trackInstances = false

describe('Components - Portals - SPortalModals - Dialog', () => {
  test('it can open and close a confirm dialog', async () => {
    const localVue = createLocalVue()

    localVue.use(Vuex)

    localVue.use(PortalVue)

    const store = new Vuex.Store({
      plugins: [Sefirot]
    })

    const wrapper = mount(SPortalModals, {
      localVue,
      store
    })

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

  test('it can open and close a loading dialog', async () => {
    const localVue = createLocalVue()

    localVue.use(Vuex)

    localVue.use(PortalVue)

    const store = new Vuex.Store({
      plugins: [Sefirot]
    })

    const wrapper = mount(SPortalModals, {
      localVue,
      store
    })

    store.dispatch('dialog/open', {
      type: 'loading',
      title: 'Dialog title.',
      text: 'Dialog message.'
    })

    await localVue.nextTick()

    expect(wrapper.findAll('.SDialog').length).toBe(1)

    store.dispatch('dialog/close')
  })

  test('it can open and close a progress dialog', async () => {
    const localVue = createLocalVue()

    localVue.use(Vuex)

    localVue.use(PortalVue)

    const store = new Vuex.Store({
      plugins: [Sefirot]
    })

    const wrapper = mount(SPortalModals, {
      localVue,
      store
    })

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
