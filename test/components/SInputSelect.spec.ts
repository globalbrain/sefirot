import { mount } from '@vue/test-utils'
import useForm from 'sefirot/compositions/useForm'
import SInputSelect from 'sefirot/components/SInputSelect.vue'

describe('components/SInputSelect', () => {
  it('emits correct value when an user select an option', () => {
    const options = [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3', value: 3 }
    ]

    const wrapper = mount(SInputSelect, {
      propsData: { value: 1, options }
    })

    wrapper.find('.SInputSelect .select').setValue(JSON.stringify({ label: 'Option 2', value: 2 }))

    expect((wrapper as any).emitted('change')[0][0]).toEqual(2)
  })

  it('"touches" the validation on change event', async () => {
    const options = [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3', value: 3 }
    ]

    const { data, validation } = useForm({
      data: { item: null },
      rules: { item: [] }
    })

    const wrapper = mount(SInputSelect, {
      propsData: {
        value: data.item,
        options,
        validation: validation.item
      }
    })

    const items = wrapper.find('.SInputSelect .select').findAll('option')

    await items.at(1).setSelected()

    expect(validation.item.$isDirty.value).toBe(true)
  })
})
