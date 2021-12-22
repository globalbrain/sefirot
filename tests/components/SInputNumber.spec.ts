/// <reference types="vitest/global.d.ts" />
import { mount } from '@vue/test-utils'
import { assertEmitted } from 'tests/Utils'
import SInputNumber from 'sefirot/components/SInputNumber.vue'

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
})
