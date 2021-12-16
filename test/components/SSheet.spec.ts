import { mount } from '@vue/test-utils'
import Vuex from 'vuex'
import Sefirot from 'sefirot/store/Sefirot'
import SSheet from 'sefirot/components/SSheet.vue'
import { createVue, CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SSheet', () => {
  beforeEach(() => {
    const { localVue } = createVue().use(Vuex)

    createWrapper = options => mount(SSheet, { localVue, ...options })
  })

  it('should close on click', async () => {
    const store = new Vuex.Store({ plugins: [Sefirot] })
    const wrapper = createWrapper({ store })

    await store.dispatch('modal/open', SSheet)
    expect(store.state.modal.items.length).toBe(1)

    wrapper.vm.close()
    expect(store.state.modal.items.length).toBe(0)
  })
})
