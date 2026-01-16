import { mount } from '@vue/test-utils'
import SInputRadios from 'sefirot/components/SInputRadios.vue'
import { assertEmitted, assertNotEmitted } from 'tests/Utils'

describe('components/SInputRadios', () => {
  it('accepts `:value`', () => {
    const wrapper = mount(SInputRadios, {
      props: {
        options: [
          { label: 'item 001', value: 1 },
          { label: 'item 002', value: 2 },
          { label: 'item 003', value: 3 }
        ],
        value: 2
      }
    })

    const input = wrapper.find('.SInputRadios .col:nth-child(2) .SInputRadio .input')

    expect(input.classes('on')).toBe(true)
  })

  it('accepts `:modelValue`', async () => {
    const wrapper = mount(SInputRadios, {
      props: {
        options: [
          { label: 'item 001', value: 1 },
          { label: 'item 002', value: 2 },
          { label: 'item 003', value: 3 }
        ],
        modelValue: 2
      }
    })

    const input = wrapper.find('.SInputRadios .col:nth-child(2) .SInputRadio .input')

    expect(input.classes('on')).toBe(true)
  })

  it('sets value to `null` when neither `value` or `modelValue` is set', async () => {
    const wrapper = mount(SInputRadios, {
      props: {
        options: [
          { label: 'item 001', value: 1 },
          { label: 'item 002', value: 2 },
          { label: 'item 003', value: 3 }
        ]
      }
    })

    const input = wrapper.find('.SInputRadios .col:nth-child(2) .SInputRadio .input')

    expect(input.classes('on')).toBe(false)
  })

  it('emits `update:model-value` and `change` events when item is selected', async () => {
    const wrapper = mount(SInputRadios, {
      props: {
        options: [
          { label: 'item 001', value: 1 },
          { label: 'item 002', value: 2 },
          { label: 'item 003', value: 3 }
        ]
      }
    })

    await wrapper.find('.SInputRadios .col:nth-child(2) .SInputRadio .input').trigger('click')

    assertEmitted(wrapper, 'update:model-value', 1, 2)
    assertEmitted(wrapper, 'change', 1, 2)
  })

  it('does not emit on click when `:disabled`', async () => {
    const wrapper = mount(SInputRadios, {
      props: {
        options: [
          { label: 'item 001', value: 1 },
          { label: 'item 002', value: 2 },
          { label: 'item 003', value: 3 }
        ],
        disabled: true
      }
    })

    await wrapper.find('.SInputRadios .col:nth-child(2) .SInputRadio .input').trigger('click')

    assertNotEmitted(wrapper, 'update:model-value')
    assertNotEmitted(wrapper, 'change')
  })

  it('does not allow deselecting item when `nullable` is set to `false`', async () => {
    const wrapper = mount(SInputRadios, {
      props: {
        options: [
          { label: 'item 001', value: 1 },
          { label: 'item 002', value: 2 },
          { label: 'item 003', value: 3 }
        ],
        value: 1,
        nullable: false
      }
    })

    await wrapper.find('.SInputRadios .col:nth-child(1) .SInputRadio .input').trigger('click')

    assertNotEmitted(wrapper, 'update:model-value')
    assertNotEmitted(wrapper, 'change')
  })

  it('allows deselecting item when `nullable` is set to `true`', async () => {
    const wrapper = mount(SInputRadios, {
      props: {
        options: [
          { label: 'item 001', value: 1 },
          { label: 'item 002', value: 2 },
          { label: 'item 003', value: 3 }
        ],
        value: 1,
        nullable: true
      }
    })

    await wrapper.find('.SInputRadios .col:nth-child(1) .SInputRadio .input').trigger('click')

    assertEmitted(wrapper, 'update:model-value', 1, null)
    assertEmitted(wrapper, 'change', 1, null)
  })
})
