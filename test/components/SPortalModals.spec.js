import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import PortalVue, { Wormhole } from 'portal-vue'
import Sefirot from 'sefirot/store/Sefirot'
import SPortalModals from 'sefirot/components/SPortalModals'

Wormhole.trackInstances = false

Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true })

jest.useFakeTimers()

const localVue = createLocalVue()

localVue.use(Vuex)

localVue.use(VueRouter)

localVue.use(PortalVue)

describe('Components - Portals - SPortalModals', () => {
  test('it can open and close a modal', async () => {
    const store = new Vuex.Store({
      plugins: [Sefirot]
    })

    mount(SPortalModals, {
      localVue,
      store
    })

    store.dispatch('modal/open', {
      name: 'modal'
    })

    await localVue.nextTick()

    expect(store.state.modal.name).toBe('modal')

    store.dispatch('modal/close')

    await localVue.nextTick()
  })

  test('it can replace a modal', async () => {
    const store = new Vuex.Store({
      plugins: [Sefirot]
    })

    mount(SPortalModals, {
      localVue,
      store
    })

    store.dispatch('modal/open', {
      name: 'modal'
    })

    await localVue.nextTick()

    expect(store.state.modal.name).toBe('modal')

    store.dispatch('modal/open', {
      name: 'modal'
    })

    await localVue.nextTick()

    expect(store.state.modal.name).toBe('modal')
  })

  test('it closes the modal on route change', async () => {
    const router = new VueRouter()

    const store = new Vuex.Store({
      plugins: [Sefirot]
    })

    const wrapper = mount(SPortalModals, {
      localVue,
      router,
      store
    })

    store.dispatch('modal/open', {
      name: 'modal'
    })

    await localVue.nextTick()

    expect(store.state.modal.name).toBe('modal')

    wrapper.vm.$router.push('/another-path')

    await localVue.nextTick()

    expect(store.state.modal.name).toBe(null)

    jest.runAllTimers()
  })
})
