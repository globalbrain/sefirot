import { mount } from '@vue/test-utils'
import SInputNumber from 'sefirot/components/SInputNumber.vue'

describe('components/SNumber', () => {
  it('should emit value on input', () => {
    const wrapper = mount(SInputNumber)

    wrapper.find('.SInputNumber .input').setValue(0)
    expect((wrapper.emitted('update:modelValue') as any[][])[0][0]).toBe(0)

    wrapper.find('.SInputNumber .input').setValue(2)
    expect((wrapper.emitted('update:modelValue') as any[][])[1][0]).toBe(2)

    wrapper.find('.SInputNumber .input').setValue(-2)
    expect((wrapper.emitted('update:modelValue') as any[][])[2][0]).toBe(-2)
  })

  it('should emit null when value is null or empty', () => {
    const wrapper = mount(SInputNumber)

    wrapper.find('.SInputNumber .input').setValue(null)
    expect((wrapper.emitted('update:modelValue') as any[][])[0][0]).toBe(null)

    wrapper.find('.SInputNumber .input').setValue(undefined)
    expect((wrapper.emitted('update:modelValue') as any[][])[1][0]).toBe(null)

    wrapper.find('.SInputNumber .input').setValue('')
    expect((wrapper.emitted('update:modelValue') as any[][])[2][0]).toBe(null)
  })
})
