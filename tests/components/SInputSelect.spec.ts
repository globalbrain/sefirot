import { mount } from '@vue/test-utils'
import SInputSelect from 'sefirot/components/SInputSelect.vue'
import { assertEmitted, assertNotEmitted } from 'tests/Utils'

describe('components/SInputSelect', async () => {
  test('it emits `update:model-value` and `change` events when item is selected', async () => {
    const wrapper = mount(SInputSelect, {
      props: {
        options: [{ label: 'Item 001', value: 1 }]
      }
    })

    await wrapper.find('select').setValue('0')

    assertEmitted(wrapper, 'update:model-value', 1, 1)
    assertEmitted(wrapper, 'change', 1, 1)
  })

  test('it does not emit event when `disabled` is set', async () => {
    const wrapper = mount(SInputSelect, {
      props: {
        options: [{ label: 'Item 001', value: 1 }],
        disabled: true
      }
    })

    await wrapper.find('select').setValue('0')

    assertNotEmitted(wrapper, 'update:model-value')
    assertNotEmitted(wrapper, 'change')
  })
})
