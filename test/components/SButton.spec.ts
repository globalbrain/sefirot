import { shallowMount } from '@vue/test-utils'
import SIconPreloaderDark from 'sefirot/components/icons/SIconPreloaderDark.vue'
import SIconPreloaderLight from 'sefirot/components/icons/SIconPreloaderLight.vue'
import SButton from 'sefirot/components/SButton.vue'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SButton', () => {
  beforeEach(() => {
    createWrapper = options => shallowMount(SButton, options)
  })

  it('should emit on click', () => {
    const wrapper = createWrapper({
      propsData: {
        label: 'BUTTON'
      }
    })

    wrapper.find('.SButton').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('should display correct preloader depending on mode', async () => {
    const wrapper = createWrapper({
      propsData: {
        label: 'BUTTON',
        loading: true
      }
    })

    expect(wrapper.vm.preloaderComponent).toBe(SIconPreloaderLight)

    await wrapper.setProps({ type: 'secondary' })
    expect(wrapper.vm.preloaderComponent).toBe(SIconPreloaderDark)

    await wrapper.setProps({ type: 'primary', inverse: true })
    expect(wrapper.vm.preloaderComponent).toBe(SIconPreloaderDark)

    await wrapper.setProps({ type: 'secondary', inverse: true })
    expect(wrapper.vm.preloaderComponent).toBe(SIconPreloaderLight)

    await wrapper.setProps({ mode: 'info' })
    expect(wrapper.vm.preloaderComponent).toBe(SIconPreloaderLight)
  })
})
