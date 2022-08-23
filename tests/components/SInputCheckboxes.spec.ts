import { mount } from '@vue/test-utils'
import SInputCheckboxes from 'sefirot/components/SInputCheckboxes.vue'

describe('components/SCheckboxes', () => {
  it('should emit on click', () => {
    const wrapper = mount(SInputCheckboxes, {
      propsData: {
        modelValue: [],
        options: [
          { label: 'Check box 1', value: 1 },
          { label: 'Check box 2', value: 2 },
          { label: 'Check box 3', value: 3 }
        ]
      }
    })

    wrapper.find('.SInputCheckbox .input').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })
})
