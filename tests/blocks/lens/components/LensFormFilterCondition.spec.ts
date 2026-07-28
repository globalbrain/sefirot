import { mount } from '@vue/test-utils'
import { type FieldData } from 'sefirot/blocks/lens/FieldData'
import { FieldRegistry } from 'sefirot/blocks/lens/FieldRegistry'
import LensFormFilterCondition, { type FilterCondition } from 'sefirot/blocks/lens/components/LensFormFilterCondition.vue'
import { FieldRegistryKey } from 'sefirot/blocks/lens/composables/FieldRegistry'
import { RelatedManyField } from 'sefirot/blocks/lens/fields/RelatedManyField'
import SInputDropdown from 'sefirot/components/SInputDropdown.vue'
import { nextTick, reactive } from 'vue'

const fields: Record<string, FieldData> = {
  members: {
    type: 'related_many',
    key: 'members',
    labelEn: 'Members',
    labelJa: 'メンバー',
    filterKey: 'id',
    sortable: false,
    freeze: false,
    width: 0,
    required: false,
    rules: [],
    title: 'name',
    image: null,
    resourceEndpointMethod: 'get',
    resourceEndpointPath: '/api/members',
    resourceEndpointDataKey: null,
    resourceTitle: 'name',
    resourceImage: null,
    displayAs: null
  }
}

function mountCondition(condition: FilterCondition) {
  const registry = new FieldRegistry()

  registry.register('related_many', (ctx, field) => {
    return new RelatedManyField(ctx, field, (async () => []) as any)
  })

  const wrapper = mount(LensFormFilterCondition, {
    props: {
      fields,
      fieldOptions: [{ label: 'Members', value: 'members' }],
      canRemove: false,
      modelValue: condition
    },
    global: {
      provide: {
        [FieldRegistryKey as symbol]: registry
      }
    }
  })

  return wrapper
}

describe('blocks/lens/components/LensFormFilterCondition', () => {
  it('offers the valueless operators for a related field', () => {
    const condition = reactive({ field: 'members', operator: '=' as const, value: null })
    const wrapper = mountCondition(condition)

    const operatorOptions = (wrapper.findAllComponents(SInputDropdown)[1] as any).props('options')

    expect(operatorOptions).toContainEqual({ label: 'is empty', value: 'empty' })
    expect(operatorOptions).toContainEqual({ label: 'is not empty', value: 'notEmpty' })

    wrapper.unmount()
  })

  it('clears the value and hides the value input when switching to a valueless operator', async () => {
    const condition = reactive<FilterCondition>({ field: 'members', operator: '=', value: 1 })
    const wrapper = mountCondition(condition)

    expect(wrapper.find('.value').element.childElementCount).toBeGreaterThan(0)

    condition.operator = 'empty'
    await nextTick()

    expect(condition.value).toBeNull()
    expect(wrapper.find('.value').element.childElementCount).toBe(0)

    wrapper.unmount()
  })

  it('shows the value input again when switching back to a valued operator', async () => {
    const condition = reactive<FilterCondition>({ field: 'members', operator: 'empty', value: null })
    const wrapper = mountCondition(condition)

    expect(wrapper.find('.value').element.childElementCount).toBe(0)

    condition.operator = 'in'
    await nextTick()

    expect(wrapper.find('.value').element.childElementCount).toBeGreaterThan(0)

    wrapper.unmount()
  })
})
