import { mount } from '@vue/test-utils'
import SButtonGroup from 'sefirot/components/SButtonGroup.vue'

describe('compoents/SButtonGroup', () => {
  it('should emit on click', () => {
    const wrapper = mount(SButtonGroup, {
      propsData: {
        items: [
          { label: 'Button A', value: 'button-a' },
          { label: 'Button B', value: 'button-b' },
          { label: 'Button C', value: 'button-c' }
        ]
      }
    })

    wrapper.find('.SButtonGroup .button').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })
})
