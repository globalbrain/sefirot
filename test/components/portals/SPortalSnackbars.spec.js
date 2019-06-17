import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import snackbars from '@/store/snackbars'
import SPortalSnackbars from '@/components/portals/SPortalSnackbars'

const localVue = createLocalVue()

localVue.use(Vuex)

jest.useFakeTimers()

describe('Components - Portals - SPortalSnackbars', () => {
  test('it can handle snackbars', () => {
    const store = new Vuex.Store({
      modules: { snackbars }
    })

    const wrapper = mount(SPortalSnackbars, { localVue, store })

    expect(wrapper.isEmpty()).toBe(true)

    store.dispatch('snackbars/push', {
      text: 'Snackbar 1.',
      actions: [{ label: 'ACTION', callback: () => {} }]
    })

    expect(wrapper.isEmpty()).toBe(false)
    expect(wrapper.findAll('.SPortalSnackbars .item').length).toBe(1)

    store.dispatch('snackbars/push', {
      text: 'Snackbar 2.',
      actions: [{ type: 'mute', label: 'MUTE ACTION', callback: () => {} }]
    })

    expect(wrapper.isEmpty()).toBe(false)
    expect(wrapper.findAll('.SPortalSnackbars .item').length).toBe(2)

    wrapper.find('.SPortalSnackbars .item:nth-child(1) .SSnackbar .close').trigger('click')

    expect(wrapper.findAll('.SPortalSnackbars .item').length).toBe(1)
  })

  test('snackbar will disappear if it reaches the max item size', () => {
    const store = new Vuex.Store({
      modules: { snackbars }
    })

    const wrapper = mount(SPortalSnackbars, { localVue, store })

    store.dispatch('snackbars/push', { text: 'Snackbar 1.' })
    store.dispatch('snackbars/push', { text: 'Snackbar 2.' })
    store.dispatch('snackbars/push', { text: 'Snackbar 3.' })
    store.dispatch('snackbars/push', { text: 'Snackbar 4.' })
    store.dispatch('snackbars/push', { text: 'Snackbar 5.' })

    expect(wrapper.findAll('.SPortalSnackbars .item').length).toBe(5)

    store.dispatch('snackbars/push', { text: 'Snackbar 6.' })

    expect(wrapper.findAll('.SPortalSnackbars .item').length).toBe(5)
  })

  test('snackbar will disappear on timeout', () => {
    const store = new Vuex.Store({
      modules: { snackbars }
    })

    const wrapper = mount(SPortalSnackbars, { localVue, store })

    store.dispatch('snackbars/push', { text: 'Snackbar 1.' })

    expect(wrapper.findAll('.SPortalSnackbars .item').length).toBe(1)

    jest.runAllTimers()

    expect(wrapper.isEmpty()).toBe(true)
  })
})
