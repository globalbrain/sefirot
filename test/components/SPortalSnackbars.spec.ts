import { mount } from '@vue/test-utils'
import Vuex from 'vuex'
import Sefirot from 'sefirot/store/Sefirot'
import SPortalSnackbars from 'sefirot/components/SPortalSnackbars.vue'
import { createVue, CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn<InstanceType<typeof SPortalSnackbars>>

describe('components/SPortalSnackbars', () => {
  beforeEach(() => {
    const { localVue } = createVue().use(Vuex)

    createWrapper = options => mount(SPortalSnackbars, { localVue, ...options })
  })

  it('should not exceed stack limit', async () => {
    const store = new Vuex.Store({ plugins: [Sefirot] })
    const wrapper = createWrapper({ store })

    for (let i = 1; i < 10; i++) {
      await store.dispatch('snackbars/push', { text: `Snackbar ${i}` })
    }

    expect(store.state.snackbars.items.length).toBe(5)
    expect(wrapper.findAll('.SPortalSnackbars .item').length).toBe(5)
  })

  it('should close on click', async () => {
    const store = new Vuex.Store({ plugins: [Sefirot] })
    const wrapper = createWrapper({ store })

    await store.dispatch('snackbars/push', { text: 'Snackbar' })
    expect(store.state.snackbars.items.length).toBe(1)

    await wrapper.find('.SPortalSnackbars .close').trigger('click')
    expect(store.state.snackbars.items.length).toBe(0)
  })
})
