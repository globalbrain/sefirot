import { mount } from '@vue/test-utils'
import SInputSwitch from 'sefirot/components/SInputSwitch.vue'

describe('components/SInputSwitch', () => {
  it('should emit on click', () => {
    const wrapper = mount(SInputSwitch, {
      propsData: {
        modelValue: false
      }
    })

    wrapper.find('.SInputSwitch .SInputSwitch-input').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('should not emit when disabled', () => {
    const wrapper = mount(SInputSwitch, {
      propsData: {
        modelValue: false,
        disabled: true
      }
    })

    wrapper.find('.SInputSwitch .SInputSwitch-input').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
