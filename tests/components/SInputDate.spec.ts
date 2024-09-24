import { mount } from '@vue/test-utils'
import SInputDate from 'sefirot/components/SInputDate.vue'
import { day } from 'sefirot/support/Day'
import { assertEmitted, assertNotEmitted } from 'tests/Utils'

describe.skip('components/SInputDate', () => {
  test('should emit input event', async () => {
    const wrapper = mount(SInputDate, {
      props: {
        modelValue: null
      }
    })

    await wrapper.find('.SInputDate .input').setValue('2023-01-01')
    assertEmitted(wrapper, 'update:model-value', 1, day('2023-01-01'))
  })

  test('should emit blur event', async () => {
    const wrapper = mount(SInputDate, {
      props: {
        modelValue: null
      }
    })

    await wrapper.find('.SInputDate .input').trigger('blur')
    assertNotEmitted(wrapper, 'blur')
  })
})
