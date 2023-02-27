import { mount } from '@vue/test-utils'
import SInputSwitch from 'sefirot/components/SInputSwitch.vue'
import { assertEmitted, assertNotEmitted } from 'tests/Utils'

describe('components/SInputSwitch', () => {
  test('it accepts `value` prop', async () => {
    const wrapper = mount(SInputSwitch, {
      props: {
        value: true
      }
    })

    expect(wrapper.find('.SInputSwitch .input').classes('on')).toBe(true)
  })

  test('it accepts `modelValue` prop', () => {
    const wrapper = mount(SInputSwitch, {
      props: {
        modelValue: true
      }
    })

    expect(wrapper.find('.SInputSwitch .input').classes('on')).toBe(true)
  })

  test('value defaults to `false` if both `value` and `modelValue` is undefined', () => {
    const wrapper = mount(SInputSwitch)

    expect(wrapper.find('.SInputSwitch .input').classes('on')).toBe(false)
  })

  test('it emits `update:model-value` and `change` events when item is selected', async () => {
    const wrapper = mount(SInputSwitch, {
      props: {
        modelValue: false
      }
    })

    await wrapper.find('.SInputSwitch .input').trigger('click')

    assertEmitted(wrapper, 'update:model-value', 1, true)
    assertEmitted(wrapper, 'change', 1, true)
  })

  test('should not emit when disabled', async () => {
    const wrapper = mount(SInputSwitch, {
      props: {
        modelValue: false,
        disabled: true
      }
    })

    await wrapper.find('.SInputSwitch .input').trigger('click')

    assertNotEmitted(wrapper, 'update:model-value')
  })
})
