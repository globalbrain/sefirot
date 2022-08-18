import { mount } from '@vue/test-utils'
import { assertEmitted } from 'tests/Utils'
import SInputNumber from 'sefirot/components/SInputNumber.vue'

describe('components/SInputNumber', () => {
  it('should emit value on input', async () => {
    const wrapper = mount(SInputNumber)

    await wrapper.find('.SInputNumber .input-area').setValue('0')
    assertEmitted(wrapper, 'update:modelValue', 0, 0)

    await wrapper.find('.SInputNumber .input-area').setValue('2')
    assertEmitted(wrapper, 'update:modelValue', 1, 2)

    await wrapper.find('.SInputNumber .input-area').setValue('-2')
    assertEmitted(wrapper, 'update:modelValue', 2, -2)
  })

  it('should emit null when value is null or empty', async () => {
    const wrapper = mount(SInputNumber)

    await wrapper.find('.SInputNumber .input-area').setValue(null)
    assertEmitted(wrapper, 'update:modelValue', 0, null)

    await wrapper.find('.SInputNumber .input-area').setValue(undefined)
    assertEmitted(wrapper, 'update:modelValue', 1, null)

    await wrapper.find('.SInputNumber .input-area').setValue('')
    assertEmitted(wrapper, 'update:modelValue', 2, null)
  })

  it('should format help text with thousand separator', async () => {
    const wrapper = mount(SInputNumber, {
      propsData: {
        helpFormat: true
      }
    })

    await wrapper.setProps({ modelValue: 1000000000.2222 })
    expect(wrapper.vm.valueWithSeparator).toBe('1,000,000,000.2222')
  })

  it('should show the value with thousand separator when the foucs is out', async () => {
    const wrapper = mount(SInputNumber, {
      propsData: {
        separator: true
      }
    })
    const input = wrapper.find('.SInputNumber .input')

    await wrapper.setProps({ modelValue: 1000000 })
    expect(input.text()).toBe('1,000,000')
  })

  it('should show the value without thousand separator when separator props does not passed', async () => {
    const wrapper = mount(SInputNumber)
    const input = wrapper.find('.SInputNumber .input')

    await wrapper.setProps({ modelValue: 1000000 })
    expect(input.text()).toBe('1000000')
  })
})
