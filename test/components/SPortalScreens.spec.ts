import { shallowMount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import PortalVue from 'portal-vue'
import Sefirot from 'sefirot/store/Sefirot'
import SPortalScreens from 'sefirot/components/SPortalScreens.vue'
import { createVue, CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

const { localVue } = createVue()
  .use(Vuex)
  .use(VueRouter)
  .use(PortalVue)

jest.useFakeTimers()

window.scrollTo = jest.fn()

describe('components/SPortalScreens', () => {
  beforeEach(() => {
    const router = new VueRouter()
    const store = new Vuex.Store({ plugins: [Sefirot] })

    createWrapper = () => shallowMount(SPortalScreens, { localVue, router, store })
  })

  it('should open and close screen', async () => {
    const wrapper = createWrapper()

    await wrapper.vm.$store.dispatch('screen/open', {
      name: 'screen'
    })

    expect(wrapper.vm.screenName).toBe('screen')

    wrapper.vm.$store.dispatch('screen/close')
    jest.runAllTimers()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.screenName).toBe(null)
  })

  it('should close screen on route change', async () => {
    const wrapper = createWrapper()

    wrapper.vm.$store.dispatch('screen/open', {
      name: 'screen'
    })

    expect(wrapper.vm.screenName).toBe('screen')

    wrapper.vm.$router.push('/another-route')
    jest.runAllTimers()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.screenName).toBe(null)
  })
})
