import { mount } from '@vue/test-utils'
import SButton from 'sefirot/components/SButton.vue'

describe('Components - SButton', () => {
  test('it emits `click` event when a user clicks the button', () => {
    const wrapper = mount(SButton, {
      propsData: {
        label: 'BUTTON'
      }
    })

    wrapper.find('.SButton').trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
