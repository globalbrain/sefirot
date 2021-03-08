import { mount } from '@vue/test-utils'
import SIconX from 'sefirot/components/icons/SIconX.vue'
import SGrid from 'sefirot/components/SGrid.vue'
import { CreateWrapperFn } from '../utils'

type Instance = InstanceType<typeof SGrid>
let createWrapper: CreateWrapperFn<Instance>

describe('components/SGrid', () => {
  beforeEach(() => {
    createWrapper = (options = {}) => mount(SGrid, {
      ...options,
      propsData: {
        columns: [{ name: 'name', label: 'NAME' }],
        records: [{ id: 1, name: 'John Doe' }],
        ...options.propsData
      }
    })
  })

  it('should emit on click when `clickable` is true', () => {
    const wrapper = createWrapper({
      propsData: { clickable: true }
    })

    wrapper.find('.SGrid .row').trigger('click')
    expect(wrapper.emitted('click')).toHaveEmittedWith({ id: 1, name: 'John Doe' })
  })

  it('should not emit on click when `clickable` is false', () => {
    const wrapper = createWrapper({
      propsData: { clickable: false }
    })

    wrapper.find('.SGrid .row').trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('should display link actions', () => {
    const wrapper = createWrapper({
      propsData: { actions: 'link' }
    })

    expect(wrapper.find('.SGrid .SGridActionLink').exists()).toBe(true)
  })

  it('should display single actions', () => {
    const wrapper = createWrapper({
      propsData: {
        actions: { icon: SIconX, callback: jest.fn() }
      }
    })

    expect(wrapper.find('.SGrid .SGridActionSingle').exists()).toBe(true)
  })

  it('should display multi actions', () => {
    const wrapper = createWrapper({
      propsData: {
        actions: [{ name: 'Edit', icon: SIconX, callback: jest.fn() }]
      }
    })

    expect(wrapper.find('.SGrid .SGridActionMulti').exists()).toBe(true)
  })
})
