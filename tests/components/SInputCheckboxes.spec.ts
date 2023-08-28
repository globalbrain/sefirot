import { mount } from '@vue/test-utils'
import SInputCheckboxes from 'sefirot/components/SInputCheckboxes.vue'
import { assertEmitted, assertNotEmitted } from 'tests/Utils'

describe('components/SInputCheckboxes', () => {
  test('accepts `:value`', async () => {
    const wrapper = mount(SInputCheckboxes, {
      props: {
        options: [{ label: 'Item 01', value: 1 }],
        value: [1]
      }
    })

    expect(wrapper.find('.SInputCheckboxes .SInputCheckbox .input').classes('on')).toBe(true)
  })

  test('accepts `:modelValue`', () => {
    const wrapper = mount(SInputCheckboxes, {
      props: {
        options: [{ label: 'Item 01', value: 1 }],
        modelValue: [1]
      }
    })

    expect(wrapper.find('.SInputCheckboxes .SInputCheckbox .input').classes('on')).toBe(true)
  })

  test('value defaults to empty array when both `:value` and `:modelValue` is missing', () => {
    const wrapper = mount(SInputCheckboxes, {
      props: {
        options: [{ label: 'Item 01', value: 1 }]
      }
    })

    expect(wrapper.find('.SInputCheckboxes .SInputCheckbox .input').classes('on')).toBe(false)
  })

  test('emits on click', async () => {
    const wrapper = mount(SInputCheckboxes, {
      props: {
        options: [{ label: 'Item 01', value: 1 }],
        value: []
      }
    })

    await wrapper.find('.SInputCheckboxes .SInputCheckbox .input').trigger('click')

    assertEmitted(wrapper, 'update:model-value', 1, [1])
    assertEmitted(wrapper, 'change', 1, [1])
  })

  test('does not emit when value becomes empty and `:nullable` is set to `false`', async () => {
    const wrapper = mount(SInputCheckboxes, {
      props: {
        options: [{ label: 'Item 01', value: 1 }],
        nullable: false,
        value: [1]
      }
    })

    await wrapper.find('.SInputCheckboxes .SInputCheckbox .input').trigger('click')

    assertNotEmitted(wrapper, 'update:model-value')
    assertNotEmitted(wrapper, 'change')
  })

  test('does not emit on click when `:disabled`', async () => {
    const wrapper = mount(SInputCheckboxes, {
      props: {
        options: [{ label: 'Item 01', value: 1 }],
        value: [],
        disabled: true
      }
    })

    await wrapper.find('.SInputCheckboxes .SInputCheckbox .input').trigger('click')

    assertNotEmitted(wrapper, 'update:model-value')
    assertNotEmitted(wrapper, 'change')
  })
})
