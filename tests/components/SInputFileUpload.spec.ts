import { mount } from '@vue/test-utils'
import SInputFileUpload from 'sefirot/components/SInputFileUpload.vue'
import { required } from 'sefirot/validation/rules'
import { assertEmitted } from 'tests/Utils'

describe('components/SInputFileUpload', () => {
  it('renders a freshly selected File by its name', () => {
    const file = new File(['x'], 'new.pdf')

    const wrapper = mount(SInputFileUpload, {
      props: { modelValue: [file] }
    })

    expect(wrapper.find('.SInputFileUploadItem .name-text').text()).toBe('new.pdf')
  })

  it('renders an already-uploaded file (string) by its basename without a size', () => {
    const wrapper = mount(SInputFileUpload, {
      props: { modelValue: ['uploads/2024/report.pdf'] }
    })

    const items = wrapper.findAll('.SInputFileUploadItem')

    expect(items).toHaveLength(1)
    expect(items[0].find('.name-text').text()).toBe('report.pdf')
    expect(items[0].find('.size').exists()).toBe(false)
  })

  it('renders a mix of uploaded references and new files', () => {
    const file = new File(['x'], 'new.pdf')

    const wrapper = mount(SInputFileUpload, {
      props: { modelValue: ['a.pdf', file] }
    })

    const names = wrapper.findAll('.SInputFileUploadItem .name-text').map((n) => n.text())

    expect(names).toEqual(['a.pdf', 'new.pdf'])
  })

  it('removes an uploaded reference while keeping the rest', async () => {
    const file = new File(['x'], 'new.pdf')

    const wrapper = mount(SInputFileUpload, {
      props: { modelValue: ['a.pdf', file] }
    })

    await wrapper.findAll('.SInputFileUploadItem .delete button')[0].trigger('click')

    assertEmitted(wrapper, 'update:model-value', 1, [file])
  })

  it('does not validate uploaded references against per-file rules', () => {
    // A string reference is an already-uploaded file; per-file rules such as
    // `required` apply to newly selected files only and must not flag it.
    const wrapper = mount(SInputFileUpload, {
      props: {
        modelValue: ['a.pdf'],
        rules: { required: required() }
      }
    })

    expect(wrapper.find('.SInputFileUploadItem').exists()).toBe(true)
    expect(wrapper.find('.SInputFileUploadItem .error').exists()).toBe(false)
  })
})
