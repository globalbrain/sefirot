import { mount } from '@vue/test-utils'
import SInputDate from 'sefirot/components/SInputDate.vue'
import { day } from 'sefirot/support/Day'
import { assertEmitted } from 'tests/Utils'

describe('components/SInputDate', () => {
  it('emits input event', async () => {
    const wrapper = mount(SInputDate, {
      props: {
        modelValue: null
      }
    })

    await wrapper.find('.SInputDate .input').setValue('2023-01-01')
    assertEmitted(wrapper, 'update:model-value', 1, day('2023-01-01'))
  })
})
