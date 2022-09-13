import { mount } from '@vue/test-utils'
import SButton from 'sefirot/components/SButton.vue'

describe('components/SButton', () => {
  it('should emit on click', () => {
    const wrapper = mount(SButton as any, {
      propsData: {
        label: 'Button'
      }
    })

    wrapper.find('.SButton').trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
