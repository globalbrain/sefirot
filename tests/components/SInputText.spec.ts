import { mount } from '@vue/test-utils'
import { assertEmitted } from 'tests/Utils'
import SInputText from 'sefirot/components/SInputText.vue'

describe('components/SInputText', () => {
  it('should emit input event', async () => {
    const wrapper = mount(SInputText)

    await wrapper.find('.SInputText .input').setValue('')
    assertEmitted(wrapper, 'update:modelValue', 0, null)

    await wrapper.find('.SInputText .input').setValue('text')
    assertEmitted(wrapper, 'update:modelValue', 1, 'text')

    await wrapper.find('.SInputText .input').setValue('0')
    assertEmitted(wrapper, 'update:modelValue', 2, '0')
  })

  it('should emit blur event', async () => {
    const wrapper = mount(SInputText, {
      props: {
        modelValue: 'text'
      }
    })

    await wrapper.find('.SInputText .input').trigger('blur')
    assertEmitted(wrapper, 'update:modelValue', 0, 'text')
    assertEmitted(wrapper, 'blur', 0, 'text')
  })

  it('should emit enter event', async () => {
    const wrapper = mount(SInputText, {
      props: {
        modelValue: 'text'
      }
    })

    await wrapper.find('.SInputText .input').trigger('keypress', { key: 'enter' })
    assertEmitted(wrapper, 'update:modelValue', 0, 'text')
    assertEmitted(wrapper, 'enter', 0, 'text')
  })
})
