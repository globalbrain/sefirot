import { mount } from '@vue/test-utils'
import Vuex from 'vuex'
import PortalVue from 'portal-vue'
import Sefirot from 'sefirot/store/Sefirot'
import { createVue, CreateWrapperFn } from '../utils'
import SScreenMinimal from './_fixtures/SScreenMinimal.vue'

let createWrapper: CreateWrapperFn

const { localVue } = createVue()
  .use(Vuex)
  .use(PortalVue)

jest.useFakeTimers()

window.scrollTo = jest.fn()

describe('components/SScreen', () => {
  beforeEach(() => {
    const store = new Vuex.Store({ plugins: [Sefirot] })

    createWrapper = () => mount(SScreenMinimal, { localVue, store })
  })

  it('should open and close screen', async () => {
    const wrapper = createWrapper()

    expect(wrapper.find('.SScreen').exists()).toBe(false)

    wrapper.vm.$store.dispatch('screen/open', { name: 's-screen-minimal' })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.SScreen').exists()).toBe(true)

    wrapper.vm.$store.dispatch('screen/close')
    jest.runAllTimers()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.SWindow').exists()).toBe(false)
  })
})
