import { mount } from '@vue/test-utils'
import SInputText from 'sefirot/components/SInputText.vue'
import { assertEmitted, createValidatable } from 'tests/Utils'

describe('components/SInputText', () => {
  it('applies color when `textColor` prop is set as value', async () => {
    const wrapper = mount(SInputText, {
      props: {
        textColor: 'info',
        modelValue: 'text'
      }
    })

    expect(wrapper.find('.SInputText .input').classes()).toContain('info')
  })

  it('applies color when `textColor` prop is set as callback', async () => {
    const wrapper = mount(SInputText, {
      props: {
        textColor: (value: string | null) => (value === 'text' ? 'success' : 'danger'),
        modelValue: 'text'
      }
    })

    const input = wrapper.find('.SInputText .input')

    expect(input.classes()).toContain('success')

    await wrapper.setProps({ modelValue: 'not text' })

    expect(input.classes()).toContain('danger')
  })

  it('emits input event', async () => {
    const wrapper = mount(SInputText, {
      propsData: {
        modelValue: null
      }
    })

    await wrapper.find('.SInputText .input').setValue('')
    assertEmitted(wrapper, 'update:model-value', 1, null)

    await wrapper.find('.SInputText .input').setValue('text')
    assertEmitted(wrapper, 'update:model-value', 2, 'text')

    await wrapper.find('.SInputText .input').setValue('0')
    assertEmitted(wrapper, 'update:model-value', 3, '0')
  })

  it('emits blur event', async () => {
    const wrapper = mount(SInputText, {
      props: {
        modelValue: 'text'
      }
    })

    await wrapper.find('.SInputText .input').trigger('blur')
    assertEmitted(wrapper, 'update:model-value', 1, 'text')
    assertEmitted(wrapper, 'blur', 1, 'text')
  })

  it('emits enter event', async () => {
    const wrapper = mount(SInputText, {
      props: {
        modelValue: 'text'
      }
    })

    await wrapper.find('.SInputText .input').trigger('keypress', { key: 'enter' })
    assertEmitted(wrapper, 'update:model-value', 1, 'text')
    assertEmitted(wrapper, 'enter', 1, 'text')
  })

  it('renders addon slots', async () => {
    const wrapper = mount(SInputText, {
      slots: {
        'addon-before': '<span>before</span>',
        'addon-after': '<span>after</span>'
      },
      props: {
        modelValue: 'text'
      }
    })

    const box = wrapper.find('.SInputText .box').element

    expect(box.children[0].textContent).toBe('before')
    expect(box.children[2].textContent).toBe('after')
  })

  it('adds focus class to box when input is focused', async () => {
    const wrapper = mount(SInputText, {
      props: {
        modelValue: 'text'
      }
    })

    await wrapper.find('.SInputText .input').trigger('focus')
    expect(wrapper.find('.SInputText .box').classes()).toContain('focus')

    await wrapper.find('.SInputText .input').trigger('blur')
    expect(wrapper.find('.SInputText .box').classes()).not.toContain('focus')
  })

  it('focuses input when box is clicked', async () => {
    const wrapper = mount(SInputText, {
      props: {
        modelValue: 'text'
      },
      attachTo: document.body
    })

    await wrapper.find('.SInputText .box').trigger('click')
    expect(wrapper.find('.SInputText .input').element).toBe(document.activeElement)
  })

  it('touches validation on blur', async () => {
    const spy = vi.fn()

    const wrapper = mount(SInputText, {
      props: {
        modelValue: null,
        validation: createValidatable({
          $touch: spy
        })
      }
    })

    await wrapper.find('.SInputText .input').trigger('blur')
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('touches validation on enter', async () => {
    const spy = vi.fn()

    const wrapper = mount(SInputText, {
      props: {
        modelValue: null,
        validation: createValidatable({
          $touch: spy
        })
      }
    })

    await wrapper.find('.SInputText .input').trigger('keypress', { key: 'enter' })
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
