import { mount } from '@vue/test-utils'
import SInputTextarea from 'sefirot/components/SInputTextarea.vue'
import { assertEmitted, createValidatable, getInputValue } from 'tests/Utils'

describe('components/SInputTextarea', () => {
  it('accepts `value` prop', async () => {
    const wrapper = mount(SInputTextarea, {
      props: { value: 'Text' }
    })

    expect(getInputValue(wrapper.find('.SInputTextarea .input'))).toBe('Text')
  })

  it('sets value to `null` when nither `value` or `modelValue` is set', async () => {
    const wrapper = mount(SInputTextarea)

    expect(getInputValue(wrapper.find('.SInputTextarea .input'))).toBe('')
  })

  it('emits input event', async () => {
    const wrapper = mount(SInputTextarea, {
      propsData: {
        modelValue: null
      }
    })

    await wrapper.find('.SInputTextarea .input').setValue('')
    assertEmitted(wrapper, 'update:model-value', 1, null)
    assertEmitted(wrapper, 'input', 1, null)

    await wrapper.find('.SInputTextarea .input').setValue('text')
    assertEmitted(wrapper, 'update:model-value', 2, 'text')
    assertEmitted(wrapper, 'input', 2, 'text')

    await wrapper.find('.SInputTextarea .input').setValue('0')
    assertEmitted(wrapper, 'update:model-value', 3, '0')
    assertEmitted(wrapper, 'input', 3, '0')
  })

  it('emits blur event', async () => {
    const wrapper = mount(SInputTextarea, {
      props: {
        modelValue: null
      }
    })

    await wrapper.find('.SInputTextarea .input').trigger('blur')
    assertEmitted(wrapper, 'update:model-value', 1, null)
    assertEmitted(wrapper, 'blur', 1, null)

    await wrapper.find('.SInputTextarea .input').setValue('text')
    await wrapper.find('.SInputTextarea .input').trigger('blur')
    assertEmitted(wrapper, 'update:model-value', 2, 'text')
    assertEmitted(wrapper, 'blur', 2, 'text')
  })

  it('touches validation on blur', async () => {
    const spy = vi.fn()

    const wrapper = mount(SInputTextarea, {
      props: {
        modelValue: null,
        validation: createValidatable({
          $touch: spy
        })
      }
    })

    await wrapper.find('.SInputTextarea .input').trigger('blur')
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
