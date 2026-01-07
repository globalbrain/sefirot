import { mount } from '@vue/test-utils'
import SInputFile from 'sefirot/components/SInputFile.vue'

describe('components/SInputFile', () => {
  it('accepts `value` prop', () => {
    const file = new File(['exmple'], 'example.txt', { type: 'text/plain' })

    const wrapper = mount(SInputFile, {
      props: {
        value: file
      }
    })

    expect(wrapper.find('.SInputFile .file-name').text()).toBe('example.txt')
  })

  it('accepts `modelValue` prop', async () => {
    const file = new File(['exmple'], 'example.txt', { type: 'text/plain' })

    const wrapper = mount(SInputFile, {
      props: {
        modelValue: file
      }
    })

    expect(wrapper.find('.SInputFile .file-name').text()).toBe('example.txt')
  })

  it('sets value to `null` when nither `value` or `modelValue` is set', async () => {
    const wrapper = mount(SInputFile)

    expect(wrapper.find('.SInputFile .file-name').exists()).toBe(false)
  })
})
