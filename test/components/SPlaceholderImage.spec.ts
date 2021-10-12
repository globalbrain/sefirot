import { mount } from '@vue/test-utils'
import SPlaceholderImage from 'sefirot/components/SPlaceholderImage.vue'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

jest.useFakeTimers()

describe('components/SPlaceholderImage', () => {
  beforeEach(() => {
    createWrapper = options => mount(SPlaceholderImage, options)
  })

  it('should emit when image has loaded', () => {
    const wrapper = createWrapper({
      propsData: {
        img: 'example.jpg',
        width: 100,
        height: 100
      }
    })

    wrapper.find('.SPlaceholderImage .img-src').trigger('load')
    jest.runAllTimers()

    expect(wrapper.emitted('load')).toBeTruthy()
  })
})
