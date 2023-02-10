import { mount } from '@vue/test-utils'
import SInputYMD from 'sefirot/components/SInputYMD.vue'
import {
  assertEmitted,
  assertNotEmitted,
  createValidatable,
  getInputValue
} from 'tests/Utils'

describe('components/SInputYMD', async () => {
  test('accepts `:value`', async () => {
    const wrapper = mount(SInputYMD, {
      props: {
        value: { year: 1970, month: 1, date: 1 }
      }
    })

    expect(getInputValue(wrapper.find('.SInputYMD .input.year'))).toBe('1970')
    expect(getInputValue(wrapper.find('.SInputYMD .input.month'))).toBe('01')
    expect(getInputValue(wrapper.find('.SInputYMD .input.date'))).toBe('01')
  })

  test('accepts `:model-value`', async () => {
    const wrapper = mount(SInputYMD, {
      props: {
        value: { year: 1970, month: 1, date: 1 }
      }
    })

    expect(getInputValue(wrapper.find('.SInputYMD .input.year'))).toBe('1970')
    expect(getInputValue(wrapper.find('.SInputYMD .input.month'))).toBe('01')
    expect(getInputValue(wrapper.find('.SInputYMD .input.date'))).toBe('01')
  })

  test('focuses conatiner when input is focused', async () => {
    const wrapper = mount(SInputYMD)

    await wrapper.find('.SInputYMD .input.year').trigger('focus')

    expect(wrapper.find('.SInputYMD .container').classes()).toContain('focus')
  })

  test('emits `@update:model-value` and `@change` on blur', async () => {
    const wrapper = mount(SInputYMD, {
      props: {
        value: { year: 1970, month: 1, date: 1 }
      }
    })

    await wrapper.find('.SInputYMD .input.year').setValue('1985')
    await wrapper.find('.SInputYMD .input.year').trigger('blur')
    assertEmitted(wrapper, 'update:model-value', 1, { year: 1985, month: 1, date: 1 })
    assertEmitted(wrapper, 'change', 1, { year: 1985, month: 1, date: 1 })

    await wrapper.find('.SInputYMD .input.month').setValue('5')
    await wrapper.find('.SInputYMD .input.month').trigger('blur')
    assertEmitted(wrapper, 'update:model-value', 2, { year: 1970, month: 5, date: 1 })
    assertEmitted(wrapper, 'change', 2, { year: 1970, month: 5, date: 1 })

    await wrapper.find('.SInputYMD .input.date').setValue('6')
    await wrapper.find('.SInputYMD .input.date').trigger('blur')
    assertEmitted(wrapper, 'update:model-value', 3, { year: 1970, month: 1, date: 6 })
    assertEmitted(wrapper, 'change', 3, { year: 1970, month: 1, date: 6 })
  })

  test('emits events with `null` when the input is empty', async () => {
    const wrapper = mount(SInputYMD, {
      props: {
        value: { year: 1970, month: 1, date: 1 }
      }
    })

    await wrapper.find('.SInputYMD .input.year').setValue('')
    await wrapper.find('.SInputYMD .input.year').trigger('blur')
    assertEmitted(wrapper, 'update:model-value', 1, { year: null, month: 1, date: 1 })
    assertEmitted(wrapper, 'change', 1, { year: null, month: 1, date: 1 })

    await wrapper.find('.SInputYMD .input.month').setValue('')
    await wrapper.find('.SInputYMD .input.month').trigger('blur')
    assertEmitted(wrapper, 'update:model-value', 2, { year: 1970, month: null, date: 1 })
    assertEmitted(wrapper, 'change', 2, { year: 1970, month: null, date: 1 })

    await wrapper.find('.SInputYMD .input.date').setValue('')
    await wrapper.find('.SInputYMD .input.date').trigger('blur')
    assertEmitted(wrapper, 'update:model-value', 3, { year: 1970, month: 1, date: null })
    assertEmitted(wrapper, 'change', 3, { year: 1970, month: 1, date: null })
  })

  test('does not emits events when no value is given', async () => {
    const wrapper = mount(SInputYMD)

    await wrapper.find('.SInputYMD .input.year').setValue('2000')
    await wrapper.find('.SInputYMD .input.year').trigger('blur')
    assertNotEmitted(wrapper, 'update:model-value')
    assertNotEmitted(wrapper, 'change')
  })

  test('touches validation when all inputs are blured', async () => {
    const spy = vi.fn()

    const wrapper = mount(SInputYMD, {
      props: {
        modelValue: { year: 1970, month: 1, date: 1 },
        validation: createValidatable({
          $touch: spy
        })
      }
    })

    await wrapper.find('.SInputYMD .input.year').trigger('blur')
    expect(spy).toHaveBeenCalledTimes(0)

    await wrapper.find('.SInputYMD .input.month').trigger('blur')
    expect(spy).toHaveBeenCalledTimes(0)

    await wrapper.find('.SInputYMD .input.date').trigger('blur')
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
