import { mount } from '@vue/test-utils'
import SInputHMS from 'sefirot/components/SInputHMS.vue'
import {
  assertEmitted,
  assertNotEmitted,
  createValidatable,
  getInputValue
} from 'tests/Utils'

describe('components/SInputHMS', async () => {
  test('accepts `:value`', async () => {
    const wrapper = mount(SInputHMS, {
      props: {
        value: { hour: '1', minute: '2', second: '3' }
      }
    })

    expect(getInputValue(wrapper.find('.SInputHMS .input.hour'))).toBe('1')
    expect(getInputValue(wrapper.find('.SInputHMS .input.minute'))).toBe('2')
    expect(getInputValue(wrapper.find('.SInputHMS .input.second'))).toBe('3')
  })

  test('accepts `:model-value`', async () => {
    const wrapper = mount(SInputHMS, {
      props: {
        modelValue: { hour: '1', minute: '2', second: '3' }
      }
    })

    expect(getInputValue(wrapper.find('.SInputHMS .input.hour'))).toBe('1')
    expect(getInputValue(wrapper.find('.SInputHMS .input.minute'))).toBe('2')
    expect(getInputValue(wrapper.find('.SInputHMS .input.second'))).toBe('3')
  })

  test('focuses conatiner when input is focused', async () => {
    const wrapper = mount(SInputHMS)

    await wrapper.find('.SInputHMS .input.hour').trigger('focus')

    expect(wrapper.find('.SInputHMS .container').classes()).toContain('focus')
  })

  test('emits `@update:model-value` and `@change` on blur', async () => {
    const wrapper = mount(SInputHMS, {
      props: {
        modelValue: { hour: '1', minute: '2', second: '3' }
      }
    })

    await wrapper.find('.SInputHMS .input.hour').setValue('4')
    await wrapper.find('.SInputHMS .input.hour').trigger('blur')
    assertEmitted(wrapper, 'update:model-value', 1, { hour: '04', minute: '2', second: '3' })
    assertEmitted(wrapper, 'change', 1, { hour: '04', minute: '2', second: '3' })

    await wrapper.find('.SInputHMS .input.minute').setValue('5')
    await wrapper.find('.SInputHMS .input.minute').trigger('blur')
    assertEmitted(wrapper, 'update:model-value', 2, { hour: '1', minute: '05', second: '3' })
    assertEmitted(wrapper, 'change', 2, { hour: '1', minute: '05', second: '3' })

    await wrapper.find('.SInputHMS .input.second').setValue('6')
    await wrapper.find('.SInputHMS .input.second').trigger('blur')
    assertEmitted(wrapper, 'update:model-value', 3, { hour: '1', minute: '2', second: '06' })
    assertEmitted(wrapper, 'change', 3, { hour: '1', minute: '2', second: '06' })
  })

  test('emits events with `null` when the input is not number', async () => {
    const wrapper = mount(SInputHMS, {
      props: {
        modelValue: { hour: '1', minute: '2', second: '3' }
      }
    })

    await wrapper.find('.SInputHMS .input.hour').setValue('abc')
    await wrapper.find('.SInputHMS .input.hour').trigger('blur')
    assertEmitted(wrapper, 'update:model-value', 1, { hour: null, minute: '2', second: '3' })
    assertEmitted(wrapper, 'change', 1, { hour: null, minute: '2', second: '3' })

    await wrapper.find('.SInputHMS .input.minute').setValue('abc')
    await wrapper.find('.SInputHMS .input.minute').trigger('blur')
    assertEmitted(wrapper, 'update:model-value', 2, { hour: '1', minute: null, second: '3' })
    assertEmitted(wrapper, 'change', 2, { hour: '1', minute: null, second: '3' })

    await wrapper.find('.SInputHMS .input.second').setValue('abc')
    await wrapper.find('.SInputHMS .input.second').trigger('blur')
    assertEmitted(wrapper, 'update:model-value', 3, { hour: '1', minute: '2', second: null })
    assertEmitted(wrapper, 'change', 3, { hour: '1', minute: '2', second: null })
  })

  test('emits events with `null` when the input is empty', async () => {
    const wrapper = mount(SInputHMS, {
      props: {
        modelValue: { hour: '1', minute: '2', second: '3' }
      }
    })

    await wrapper.find('.SInputHMS .input.hour').setValue('')
    await wrapper.find('.SInputHMS .input.hour').trigger('blur')
    assertEmitted(wrapper, 'update:model-value', 1, { hour: null, minute: '2', second: '3' })
    assertEmitted(wrapper, 'change', 1, { hour: null, minute: '2', second: '3' })

    await wrapper.find('.SInputHMS .input.minute').setValue('')
    await wrapper.find('.SInputHMS .input.minute').trigger('blur')
    assertEmitted(wrapper, 'update:model-value', 2, { hour: '1', minute: null, second: '3' })
    assertEmitted(wrapper, 'change', 2, { hour: '1', minute: null, second: '3' })

    await wrapper.find('.SInputHMS .input.second').setValue('')
    await wrapper.find('.SInputHMS .input.second').trigger('blur')
    assertEmitted(wrapper, 'update:model-value', 3, { hour: '1', minute: '2', second: null })
    assertEmitted(wrapper, 'change', 3, { hour: '1', minute: '2', second: null })
  })

  test('does not emits events when no value is given', async () => {
    const wrapper = mount(SInputHMS)

    await wrapper.find('.SInputHMS .input.hour').setValue('4')
    await wrapper.find('.SInputHMS .input.hour').trigger('blur')
    assertNotEmitted(wrapper, 'update:model-value')
    assertNotEmitted(wrapper, 'change')
  })

  test('touches validation when all inputs are blured', async () => {
    const spy = vi.fn()

    const wrapper = mount(SInputHMS, {
      props: {
        modelValue: { hour: '1', minute: '2', second: '3' },
        validation: createValidatable({
          $touch: spy
        })
      }
    })

    await wrapper.find('.SInputHMS .input.hour').trigger('blur')
    expect(spy).toHaveBeenCalledTimes(0)

    await wrapper.find('.SInputHMS .input.minute').trigger('blur')
    expect(spy).toHaveBeenCalledTimes(0)

    await wrapper.find('.SInputHMS .input.second').trigger('blur')
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
