import { mount } from '@vue/test-utils'
import SInputText from 'sefirot/components/SInputText.vue'
import { assertEmitted } from 'tests/Utils'

describe('components/SInputText', () => {
  it('should emit input event', async () => {
    const wrapper = mount(SInputText, {
      propsData: {
        modelValue: null
      }
    })

    await wrapper.find('.SInputText .input').setValue('')
    assertEmitted(wrapper, 'update:model-value', 1, null)

    await wrapper.find('.SInputText .input').setValue('text')
    assertEmitted(wrapper, 'update:model-value', 2, 'text')

    await wrapper.find('.SInputText .input').setValue('0')
    assertEmitted(wrapper, 'update:model-value', 3, '0')
  })

  it('should emit blur event', async () => {
    const wrapper = mount(SInputText, {
      props: {
        modelValue: 'text'
      }
    })

    await wrapper.find('.SInputText .input').trigger('blur')
    assertEmitted(wrapper, 'update:model-value', 1, 'text')
    assertEmitted(wrapper, 'blur', 1, 'text')
  })

  it('should emit enter event', async () => {
    const wrapper = mount(SInputText, {
      props: {
        modelValue: 'text'
      }
    })

    await wrapper.find('.SInputText .input').trigger('keypress', { key: 'enter' })
    assertEmitted(wrapper, 'update:model-value', 1, 'text')
    assertEmitted(wrapper, 'enter', 1, 'text')
  })
})
