import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueThinModal from 'vue-thin-modal'
import Sefirot from '@/store/Sefirot'
import SPortalModals from '@/components/portals/SPortalModals'

const localVue = createLocalVue()

localVue.use(Vuex)

localVue.use(VueThinModal, {
  autoMountPortal: false
})

describe('Components - Portals - SPortalModals - Dialog', () => {
  test('it can open and close a confirm dialog', async () => {
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

    expect(wrapper.findAll('.SPortalModals .SDialog').length).toBe(1)

    store.dispatch('dialog/close')

    await localVue.nextTick()

    expect(wrapper.findAll('.SPortalModals .SDialog').length).toBe(0)
  })

  test('it can open and close a loading dialog', async () => {
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

    expect(wrapper.findAll('.SPortalModals .SDialog').length).toBe(1)
  })

  test('it can open and close a progress dialog', async () => {
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

    expect(wrapper.findAll('.SPortalModals .SDialog').length).toBe(1)

    store.dispatch('dialog/update', {
      progress: { now: 50, max: 100 }
    })

    await localVue.nextTick()

    expect(wrapper.findAll('.SPortalModals .SDialog').length).toBe(1)
  })
})
