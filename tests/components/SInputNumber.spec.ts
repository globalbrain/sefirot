import { mount } from '@vue/test-utils'
import SInputNumber from 'sefirot/components/SInputNumber.vue'
import { assertEmitted } from 'tests/Utils'

describe('components/SInputNumber', () => {
  it('should emit value on input', async () => {
    const wrapper = mount(SInputNumber)

    await wrapper.find('.SInputNumber .input').setValue('0')
    assertEmitted(wrapper, 'update:modelValue', 0, 0)

    await wrapper.find('.SInputNumber .input').setValue('2')
    assertEmitted(wrapper, 'update:modelValue', 1, 2)

    await wrapper.find('.SInputNumber .input').setValue('-2')
    assertEmitted(wrapper, 'update:modelValue', 2, -2)
  })

  it('should emit null when value is null or empty', async () => {
    const wrapper = mount(SInputNumber)

    await wrapper.find('.SInputNumber .input').setValue(null)
    assertEmitted(wrapper, 'update:modelValue', 0, null)

    await wrapper.find('.SInputNumber .input').setValue(undefined)
    assertEmitted(wrapper, 'update:modelValue', 1, null)

    await wrapper.find('.SInputNumber .input').setValue('')
    assertEmitted(wrapper, 'update:modelValue', 2, null)
  })

  it('should format help text with thousand separator', async () => {
    const wrapper = mount(SInputNumber, {
      propsData: {
        helpFormat: true
      }
    })

    await wrapper.setProps({ modelValue: 1000000000.2222 })
    expect((wrapper.vm as any).valueWithSeparator).toBe('1,000,000,000.2222')
  })

  it('should show the value with thousand separator when the foucs is out', async () => {
    const wrapper = mount(SInputNumber, {
      propsData: {
        separator: true
      }
    })

    await wrapper.setProps({ modelValue: 1000000 })

    expect(wrapper.find('.SInputNumber .display').text()).toBe('1,000,000')
  })

  it('should show the value without thousand separator when separator props is not passed', async () => {
    const wrapper = mount(SInputNumber)

    await wrapper.setProps({ modelValue: 1000000 })

    expect((wrapper.find('.SInputNumber .input').element as any).value).toBe('1000000')
  })
})
