import { mount } from '@vue/test-utils'
import SInputSwitch from 'sefirot/components/SInputSwitch.vue'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SInputSwitch', () => {
  beforeEach(() => {
    createWrapper = options => mount(SInputSwitch, options)
  })

  it('should emit value on click', () => {
    const wrapper = createWrapper({
      propsData: { value: false }
    })

    wrapper.find('.SInputSwitch .SInputSwitch-input').trigger('click')
    expect(wrapper.emitted('change')).toHaveEmittedWith(true)
  })

  it('should not emit value when disabled', () => {
    const wrapper = createWrapper({
      propsData: { value: false, disabled: true }
    })

    wrapper.find('.SInputSwitch .SInputSwitch-input').trigger('click')
    expect(wrapper.emitted('change')).toBeUndefined()
  })
})
