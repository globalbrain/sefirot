import { flushPromises, mount } from '@vue/test-utils'
import { type Option } from 'sefirot/components/Option'
import SInputSelectSearch from 'sefirot/components/SInputSelectSearch.vue'

interface Foo { id: number; name: string }

const items: Foo[] = [
  { id: 1, name: 'Alpha' },
  { id: 2, name: 'Bravo' }
]

const fetch = async (): Promise<Foo[]> => items
// `foo: any` — mount() can't infer the component's generic `T`, so it defaults to
// `unknown`; a `Foo` param would be contravariantly incompatible with that.
const toOption = (foo: any): Option => ({ value: foo.id, label: foo.name })

// Mount with a two-way `modelValue` binding so selections feed back into the prop,
// mirroring a real `v-model`.
// Props cast to `any`: mount()'s strict prop typing against a generic SFC (with a
// required model + a self-referential update handler) is more trouble than it's
// worth here — the assertions below exercise the runtime behavior.
function factory(props: Record<string, unknown>) {
  const wrapper = mount(SInputSelectSearch, {
    props: {
      fetch,
      toOption,
      'onUpdate:modelValue': (value: unknown): void => {
        wrapper.setProps({ modelValue: value })
      },
      ...props
    } as any
  })
  return wrapper
}

async function open(wrapper: ReturnType<typeof factory>) {
  await wrapper.find('.box').trigger('click')
  await flushPromises()
}

describe('components/SInputSelectSearch', () => {
  // `multiple` is a generic-typed prop (`boolean & Multiple`); the intersection is
  // what preserves Vue's Boolean casting. A bare attribute arrives as '', which must
  // still be read as `true` — otherwise the control silently falls back to single.
  it('casts a bare `multiple` attribute to true and selects into an array', async () => {
    const wrapper = factory({ modelValue: [], multiple: '' })

    await open(wrapper)

    // Multiple mode renders checkboxes, not radios.
    expect(wrapper.find('.list .checkbox').exists()).toBe(true)
    expect(wrapper.find('.list .radio').exists()).toBe(false)

    const buttons = wrapper.findAll('.list .button')
    await buttons[0].trigger('click')
    await buttons[1].trigger('click')

    expect(wrapper.props('modelValue')).toStrictEqual([items[0], items[1]])
  })

  it('defaults to single select (radios) and replaces the model on select', async () => {
    const wrapper = factory({ modelValue: null })

    await open(wrapper)

    expect(wrapper.find('.list .radio').exists()).toBe(true)
    expect(wrapper.find('.list .checkbox').exists()).toBe(false)

    await wrapper.findAll('.list .button')[1].trigger('click')

    expect(wrapper.props('modelValue')).toStrictEqual(items[1])
  })
})
