import { mount } from '@vue/test-utils'
import SInputBase from 'sefirot/components/SInputBase.vue'
import { createValidatable } from 'tests/Utils'

describe('components/SInputBase', () => {
  it('shows label and note', () => {
    const wrapper = mount(SInputBase, {
      props: {
        name: 'Input',
        note: 'Some note.',
        label: 'Label for input.'
      }
    })

    expect(wrapper.find('label').text()).toContain('Label for input.')
    expect(wrapper.find('.label-note').text()).toBe('Some note.')
  })

  it('prefers info slot over prop', () => {
    mount(SInputBase, {
      props: {
        label: 'Label for input.',
        info: 'Helpful message.'
      },
      slots: {
        info: 'Info in slot.'
      }
    })

    expect(document.body.querySelector('#sefirot-modals .tip')?.textContent).toBe('Info in slot.')
  })

  it('shows error message and help text if validation fails', () => {
    const wrapper = mount(SInputBase, {
      props: {
        name: 'Input',
        help: 'Enter some data.',
        validation: createValidatable({
          $dirty: true,
          $invalid: true,
          $errors: [{
            $message: 'Input cannot be empty.'
          }]
        })
      }
    })

    expect(wrapper.find('.help-error').text()).toBe('Input cannot be empty.')
    expect(wrapper.find('.help-text').text()).toBe('Enter some data.')
  })

  it('does not show error message when validation fails but do not contain error messages', () => {
    const wrapper = mount(SInputBase, {
      props: {
        name: 'Input',
        help: 'Enter some data.',
        validation: createValidatable({
          $dirty: true,
          $invalid: true,
          $errors: []
        })
      }
    })

    expect(wrapper.find('.help-error').exists()).toBe(false)
  })

  it('shows info', () => {
    mount(SInputBase, {
      props: {
        label: 'Label for input.',
        info: 'Helpful message.'
      }
    })

    expect(document.body.querySelector('#sefirot-modals .tip')?.textContent).toBe('Helpful message.')
  })
})
