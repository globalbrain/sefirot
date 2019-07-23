import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueThinModal from 'vue-thin-modal'
import Sefirot from '@/store/Sefirot'
import SPortalModals from '@/components/portals/SPortalModals'

jest.useFakeTimers()

const localVue = createLocalVue()

localVue.use(Vuex)

localVue.use(VueRouter)

localVue.use(VueThinModal, {
  autoMountPortal: false
})

describe('Components - Portals - SPortalModals', () => {
  test('it can open and close a modal', async () => {
    const store = new Vuex.Store({
      plugins: [Sefirot]
    })

    const wrapper = mount(SPortalModals, {
      localVue,
      store
    })

    store.dispatch('modal/open', {
      name: 'modal'
    })

    await localVue.nextTick()

    expect(wrapper.vm.modalName).toBe('modal')

    store.dispatch('modal/close')

    await localVue.nextTick()

    jest.runAllTimers()
  })

  test('it can replace a modal', async () => {
    const store = new Vuex.Store({
      plugins: [Sefirot]
    })

    const wrapper = mount(SPortalModals, {
      localVue,
      store
    })

    store.dispatch('modal/open', {
      name: 'modal-1'
    })

    await localVue.nextTick()

    expect(wrapper.vm.modalName).toBe('modal-1')

    store.dispatch('modal/open', {
      name: 'modal-2'
    })

    await localVue.nextTick()

    expect(wrapper.vm.modalName).toBe('modal-2')
  })

  test('it opens modal but keep body padding if screen is open', async () => {
    const store = new Vuex.Store({
      plugins: [Sefirot]
    })

    const wrapper = mount(SPortalModals, {
      localVue,
      store
    })

    document.body.classList.add('screen-open')

    store.dispatch('modal/open', {
      name: 'modal'
    })

    await localVue.nextTick()

    expect(wrapper.vm.modalName).toBe('modal')

    store.dispatch('modal/close')

    await localVue.nextTick()

    jest.runAllTimers()
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

    expect(wrapper.vm.modalName).toBe('modal')

    wrapper.vm.$router.push('/another-path')

    await localVue.nextTick()

    expect(wrapper.vm.modalName).toBe(null)

    jest.runAllTimers()
  })

  test('it closes modal but keep body padding if screen is open', async () => {
    const router = new VueRouter()

    const store = new Vuex.Store({
      plugins: [Sefirot]
    })

    const wrapper = mount(SPortalModals, {
      localVue,
      router,
      store
    })

    document.body.classList.add('screen-open')

    store.dispatch('modal/open', {
      name: 'modal'
    })

    await localVue.nextTick()

    expect(wrapper.vm.modalName).toBe('modal')

   store.dispatch('modal/close')

    await localVue.nextTick()

    expect(wrapper.vm.modalName).toBe(null)

    jest.runAllTimers()
  })
})
