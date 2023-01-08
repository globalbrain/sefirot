import { mount } from '@vue/test-utils'
import SInputSelect from 'sefirot/components/SInputSelect.vue'
import { assertEmitted, assertNotEmitted, eventTargetValue } from 'tests/Utils'

describe('components/SInputSelect', () => {
  test('it emits `update:model-value` and `change` events when item is selected', async () => {
    const wrapper = mount(SInputSelect, {
      props: {
        options: []
      }
    })

    ;(wrapper.vm as any).emitChange(eventTargetValue(JSON.stringify({ label: 'Item 001', value: 1 })))

    assertEmitted(wrapper, 'update:model-value', 1, 1)
    assertEmitted(wrapper, 'change', 1, 1)
  })

  test('it does not emit event when `disabled` is set', async () => {
    const wrapper = mount(SInputSelect, {
      props: {
        options: [],
        disabled: true
      }
    })

    ;(wrapper.vm as any).emitChange(eventTargetValue(JSON.stringify({ label: 'Item 001', value: 1 })))

    assertNotEmitted(wrapper, 'update:model-value')
    assertNotEmitted(wrapper, 'change')
  })
})
