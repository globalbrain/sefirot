import { mount, createLocalVue } from '@vue/test-utils'
import Vuelidate from 'vuelidate'
import FormParentComponent from './_fixtures/FormParentComponent'

const localVue = createLocalVue()

localVue.use(Vuelidate)

describe('Mixins - Form', () => {
  test('it can reset the form', () => {
    const wrapper = mount(FormParentComponent, { localVue })

    wrapper.find('.name').setValue('John Doe')
    wrapper.find('.age').setValue(30)

    expect(wrapper.find('.FormChildComponent').vm.form.name).toBe('John Doe')
    expect(wrapper.find('.FormChildComponent').vm.form.age).toBe(30)

    wrapper.find('.reset').trigger('click')

    expect(wrapper.find('.FormChildComponent').vm.form.name).toBe('')
    expect(wrapper.find('.FormChildComponent').vm.form.age).toBe(null)
  })

  test('it can validate the form', () => {
    const wrapper = mount(FormParentComponent, { localVue })

    wrapper.find('.name').setValue('John Doe')

    wrapper.find('.submit').trigger('click')

    expect(wrapper.find('.FormChildComponent').vm.valid).toBe(false)

    wrapper.find('.age').setValue(30)

    wrapper.find('.submit').trigger('click')

    expect(wrapper.find('.FormChildComponent').vm.valid).toBe(true)
  })
})
