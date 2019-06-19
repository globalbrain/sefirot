import { mount } from '@vue/test-utils'
import SIconPreloaderDark from '@/components/icons/SIconPreloaderDark'
import SIconPreloaderLight from '@/components/icons/SIconPreloaderLight'
import SButton from '@/components/buttons/SButton'

describe('Components - Buttons - SButton', () => {
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
    const wrapper01 = mount(SButton, {
      propsData: {
        label: 'BUTTON',
        type: 'primary',
        loading: true
      }
    })

    expect(wrapper01.find('.SButton .loader-icon').is(SIconPreloaderLight)).toBeTruthy()

    const wrapper02 = mount(SButton, {
      propsData: {
        label: 'BUTTON',
        type: 'secondary',
        loading: true
      }
    })

    expect(wrapper02.find('.SButton .loader-icon').is(SIconPreloaderDark)).toBeTruthy()

    const wrapper04 = mount(SButton, {
      propsData: {
        label: 'BUTTON',
        type: 'primary',
        inverse: true,
        loading: true
      }
    })

    expect(wrapper04.find('.SButton .loader-icon').is(SIconPreloaderDark)).toBeTruthy()

    const wrapper05 = mount(SButton, {
      propsData: {
        label: 'BUTTON',
        type: 'secondary',
        inverse: true,
        loading: true
      }
    })

    expect(wrapper05.find('.SButton .loader-icon').is(SIconPreloaderLight)).toBeTruthy()

    const wrapper06 = mount(SButton, {
      propsData: {
        label: 'BUTTON',
        mode: 'info',
        inverse: true,
        loading: true
      }
    })

    expect(wrapper06.find('.SButton .loader-icon').is(SIconPreloaderLight)).toBeTruthy()
  })
})
