import { mount } from '@vue/test-utils'
import SInputNumber from 'sefirot/components/SInputNumber.vue'
import { assertEmitted, getInputValue } from 'tests/Utils'

describe('components/SInputNumber', () => {
  it('accepts `value` prop', async () => {
    const wrapper = mount(SInputNumber, {
      props: { value: 1 }
    })

    expect(getInputValue(wrapper.find('.SInputNumber .input'))).toBe('1')
  })

  it('sets value to `null` when nither `value` or `modelValue` is set', async () => {
    const wrapper = mount(SInputNumber)

    expect(getInputValue(wrapper.find('.SInputNumber .input'))).toBe('')
  })

  it('applies color when `textColor` prop is set as value', async () => {
    const wrapper = mount(SInputNumber, {
      props: {
        textColor: 'info',
        modelValue: 123
      }
    })

    expect(wrapper.find('.SInputNumber .input').classes()).toContain('info')
  })

  it('applies color when `textColor` prop is set as callback', async () => {
    const wrapper = mount(SInputNumber, {
      props: {
        textColor: (value: number | null) => value === 123 ? 'success' : 'danger',
        modelValue: 123
      }
    })

    const input = wrapper.find('.SInputNumber .input')

    expect(input.classes()).toContain('success')

    await wrapper.setProps({ modelValue: 456 })

    expect(input.classes()).toContain('danger')
  })

  it('emits value on input event', async () => {
    const wrapper = mount(SInputNumber, {
      props: { modelValue: 1 }
    })

    await wrapper.find('.SInputNumber .input').setValue('0')
    assertEmitted(wrapper, 'update:model-value', 1, 0)

    await wrapper.find('.SInputNumber .input').setValue('2')
    assertEmitted(wrapper, 'update:model-value', 3, 2)

    await wrapper.find('.SInputNumber .input').setValue('-2')
    assertEmitted(wrapper, 'update:model-value', 5, -2)
  })

  it('emits value on input', async () => {
    const wrapper = mount(SInputNumber, {
      props: { modelValue: 1 }
    })

    await wrapper.find('.SInputNumber .input').setValue('0')
    assertEmitted(wrapper, 'update:model-value', 1, 0)

    await wrapper.find('.SInputNumber .input').setValue('2')
    assertEmitted(wrapper, 'update:model-value', 3, 2)

    await wrapper.find('.SInputNumber .input').setValue('-2')
    assertEmitted(wrapper, 'update:model-value', 5, -2)
  })

  it('emits null when value is null or empty', async () => {
    const wrapper = mount(SInputNumber, {
      props: { modelValue: 1 }
    })

    await wrapper.find('.SInputNumber .input').setValue(null)
    assertEmitted(wrapper, 'update:model-value', 1, null)

    await wrapper.find('.SInputNumber .input').setValue(undefined)
    assertEmitted(wrapper, 'update:model-value', 3, null)

    await wrapper.find('.SInputNumber .input').setValue('')
    assertEmitted(wrapper, 'update:model-value', 5, null)
  })

  it('is shows the value with thousand separator when the foucs is out', async () => {
    const wrapper = mount(SInputNumber, {
      props: {
        modelValue: null,
        separator: true
      }
    })

    await wrapper.setProps({ modelValue: 1000000 })

    expect(wrapper.find('.SInputNumber .display').text()).toBe('1,000,000')
  })

  it('shows the value without thousand separator when separator props is not passed', async () => {
    const wrapper = mount(SInputNumber, {
      props: { modelValue: 1 }
    })

    await wrapper.setProps({ modelValue: 1000000 })

    expect((wrapper.find('.SInputNumber .input').element as any).value).toBe('1000000')
  })

  it('does not display too large number', async () => {
    const wrapper = mount(SInputNumber, {
      props: {
        separator: true,
        modelValue: 100000000000000000000
      }
    })

    expect((wrapper.find('.SInputNumber .display').text())).toBe('The number is too big')
  })

  it('displays `displayValue` if passed', async () => {
    const wrapper = mount(SInputNumber, {
      props: {
        modelValue: 1,
        displayValue: '100'
      }
    })

    expect((wrapper.find('.SInputNumber .display').text())).toBe('100')
  })
})
