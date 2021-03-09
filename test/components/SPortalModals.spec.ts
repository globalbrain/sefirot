import { shallowMount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import PortalVue from 'portal-vue'
import Sefirot from 'sefirot/store/Sefirot'
import SPortalModals from 'sefirot/components/SPortalModals.vue'
import { createVue, CreateWrapperFn } from '../utils'

type Instance = InstanceType<typeof SPortalModals>
let createWrapper: CreateWrapperFn<Instance>

const { localVue } = createVue()
  .use(Vuex)
  .use(VueRouter)
  .use(PortalVue)

jest.useFakeTimers()

Element.prototype.scrollTo = jest.fn()

describe('components/SPortalModals', () => {
  beforeEach(() => {
    const router = new VueRouter()
    const store = new Vuex.Store({ plugins: [Sefirot] })

    createWrapper = options => shallowMount(SPortalModals, {
      localVue,
      router,
      store,
      ...options
    })
  })

  it('should open and close modal', async () => {
    const wrapper = createWrapper()

    await wrapper.vm.$store.dispatch('modal/open', { name: 'modal' })
    expect(wrapper.vm.show).toBe(true)

    await wrapper.vm.$store.dispatch('modal/close')
    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.show).toBe(false)
  })

  it('should close modal on route change', async () => {
    const wrapper = createWrapper()

    wrapper.vm.$store.dispatch('modal/open', { name: 'modal' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.show).toBe(true)

    wrapper.vm.$router.push('/another-route')
    await wrapper.vm.$nextTick()
    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.show).toBe(false)
  })
})
