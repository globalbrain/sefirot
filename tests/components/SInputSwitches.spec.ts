import { mount } from '@vue/test-utils'
import SInputSwitches from 'sefirot/components/SInputSwitches.vue'

describe('components/SInputSwitches', () => {
  it('emits on click', () => {
    const wrapper = mount(SInputSwitches, {
      propsData: {
        options: [
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
          { label: 'Option 3', value: 3 }
        ],
        modelValue: [1]
      }
    })

    wrapper.find('.SInputSwitches .input').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })
})
