import { mount } from '@vue/test-utils'
import SButton from 'sefirot/components/SButton.vue'

describe('components/SButton', () => {
  it('should emit on click', () => {
    const wrapper = mount(SButton, {
      propsData: {
        label: 'BUTTON'
      }
    })

    wrapper.find('.SButton').trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
