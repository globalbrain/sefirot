import { shallowMount } from '@vue/test-utils'
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
})
