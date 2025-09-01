import { mount } from '@vue/test-utils'
import SInputCheckbox from 'sefirot/components/SInputCheckbox.vue'
import { assertEmitted, assertNotEmitted } from 'tests/Utils'

describe('components/SInputCheckbox', () => {
  it('accepts `:value`', async () => {
    const wrapper = mount(SInputCheckbox, {
      props: {
        value: true
      }
    })

    expect(wrapper.find('.SInputCheckbox .input').classes('on')).toBe(true)
  })

  it('accepts `:modelValue`', () => {
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

  it('emits on click', async () => {
    const wrapper = mount(SInputCheckbox, {
      props: {
        value: false
      }
    })

    await wrapper.find('.SInputCheckbox .input').trigger('click')

    assertEmitted(wrapper, 'update:model-value', 1, true)
    assertEmitted(wrapper, 'change', 1, true)
  })

  it('does not emit on click when `:disabled`', async () => {
    const wrapper = mount(SInputCheckbox, {
      props: {
        value: false,
        disabled: true
      }
    })

    await wrapper.find('.SInputCheckbox .input').trigger('click')

    assertNotEmitted(wrapper, 'update:model-value')
    assertNotEmitted(wrapper, 'change')
  })
})
