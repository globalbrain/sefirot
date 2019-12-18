import { mount } from '@vue/test-utils'
import SIconPreloaderDark from 'sefirot/components/icons/SIconPreloaderDark.vue'
import SIconPreloaderLight from 'sefirot/components/icons/SIconPreloaderLight.vue'
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

  test('it displays correct preloader depending on the button state', () => {
    const checks = [
      [{ label: 'B', type: 'primary', loading: true }, SIconPreloaderLight],
      [{ label: 'B', type: 'secondary', loading: true }, SIconPreloaderDark],
      [{ label: 'B', type: 'primary', inverse: true, loading: true }, SIconPreloaderDark],
      [{ label: 'B', type: 'secondary', inverse: true, loading: true }, SIconPreloaderLight],
      [{ label: 'B', mode: 'info', inverse: true, loading: true }, SIconPreloaderLight],
    ]

    checks.forEach((check) => {
      const wrapper = mount(SButton, {
        propsData: check[0]
      })

      expect(wrapper.find('.SButton .loader-icon').is(check[1])).toBeTruthy()
    })
  })
})
