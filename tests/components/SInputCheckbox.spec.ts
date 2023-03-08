import { mount } from '@vue/test-utils'
import SInputCheckbox from 'sefirot/components/SInputCheckbox.vue'
import { assertEmitted } from 'tests/Utils'

describe('components/SInputCheckbox', () => {
  test('accepts `:value`', async () => {
    const wrapper = mount(SInputCheckbox, {
      props: {
        value: true
      }
    })

    expect(wrapper.find('.SInputCheckbox .input').classes('on')).toBe(true)
  })

  test('accepts `:modelValue`', () => {
    const wrapper = mount(SInputCheckbox, {
      props: {
        modelValue: true
      }
    })

    expect(wrapper.find('.SInputCheckbox .input').classes('on')).toBe(true)
  })

  test('value defaults to `false` when both `:value` and `:modelValue` is missing', () => {
    const wrapper = mount(SInputCheckbox)

    expect(wrapper.find('.SInputCheckbox .input').classes('on')).toBe(false)
  })

  test('emits on click', async () => {
    const wrapper = mount(SInputCheckbox, {
      props: {
        value: false
      }
    })

    await wrapper.find('.SInputCheckbox .input').trigger('click')

    assertEmitted(wrapper, 'update:model-value', 1, true)
    assertEmitted(wrapper, 'change', 1, true)
  })
})
