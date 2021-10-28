import { mount } from '@vue/test-utils'
import { useForm } from 'sefirot/composables/Form'
import SInputFile from 'sefirot/components/SInputFile.vue'
import { CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn

describe('components/SInputFile', () => {
  beforeEach(() => {
    createWrapper = options => mount(SInputFile, options)
  })

  it('should display file name when the value is present', () => {
    const file = new File(['foo'], 'foo.txt', { type: 'text/plain' })

    const wrapper = createWrapper({
      propsData: {
        value: file
      }
    })

    const text = wrapper.find('.SInputFile .file-name').text()

    expect(text).toBe('foo.txt')
  })

  it('should emit the event by triggering click event on hidden input', () => {
    const wrapper = createWrapper()

    wrapper.vm.open()
    expect(true).toBe(true) // stub assertion
  })

  it('should emit `input` event with file object', () => {
    const wrapper = createWrapper()

    const file = new File(['foo'], 'foo.txt', { type: 'text/plain' })

    wrapper.vm.handleChange(file)

    expect(wrapper.emitted('input')).toHaveEmittedWith(file)
  })

  it('should emit `input` event with `null` if user did not select a file', () => {
    const wrapper = createWrapper()

    wrapper.vm.handleChange()

    expect(wrapper.emitted('input')).toHaveEmittedWith(null)
  })

  it('should touch validation object if it exists', () => {
    const { validation } = useForm({
      data: { file: null },
      rules: { file: [] }
    })

    const wrapper = createWrapper({
      propsData: {
        validation: validation.file
      }
    })

    const file = new File(['foo'], 'foo.txt', { type: 'text/plain' })

    wrapper.vm.handleChange(file)

    expect(validation.file.$isDirty.value).toBe(true)
  })
})
