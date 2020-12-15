import { mount } from '@vue/test-utils'
import SIconPreloaderDark from 'sefirot/components/icons/SIconPreloaderDark.vue'
import SIconPreloaderLight from 'sefirot/components/icons/SIconPreloaderLight.vue'
import SButton from 'sefirot/components/SButton.vue'

describe('components/SButton', () => {
  it('emits `click` event when a user clicks the button', () => {
    const wrapper = mount(SButton, {
      propsData: {
        label: 'BUTTON'
      }
    })

    wrapper.find('.SButton').trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('shows the correct preloader depending on the button mode', async () => {
    const wrapper = mount(SButton, {
      propsData: {
        label: 'BUTTON',
        loading: true
      }
    })

    expect((wrapper as any).vm.preloaderComponent).toBe(SIconPreloaderLight)

    await wrapper.setProps({ type: 'secondary' })
    expect((wrapper as any).vm.preloaderComponent).toBe(SIconPreloaderDark)

    await wrapper.setProps({ type: 'primary', inverse: true })
    expect((wrapper as any).vm.preloaderComponent).toBe(SIconPreloaderDark)

    await wrapper.setProps({ type: 'secondary', inverse: true })
    expect((wrapper as any).vm.preloaderComponent).toBe(SIconPreloaderLight)

    await wrapper.setProps({ mode: 'info' })
    expect((wrapper as any).vm.preloaderComponent).toBe(SIconPreloaderLight)
  })
})
