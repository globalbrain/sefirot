import { mount } from '@vue/test-utils'
import { type FieldData } from 'sefirot/blocks/lens/FieldData'
import { FieldRegistry } from 'sefirot/blocks/lens/FieldRegistry'
import LensFormFilter from 'sefirot/blocks/lens/components/LensFormFilter.vue'
import LensFormFilterCondition from 'sefirot/blocks/lens/components/LensFormFilterCondition.vue'
import { FieldRegistryKey } from 'sefirot/blocks/lens/composables/FieldRegistry'
import { RelatedManyField } from 'sefirot/blocks/lens/fields/RelatedManyField'

function makeFieldData(key: string, overrides: Partial<FieldData> = {}): FieldData {
  return {
    type: 'related_many',
    key,
    labelEn: key,
    labelJa: key,
    filterKey: 'id',
    sortable: false,
    freeze: false,
    width: 0,
    required: false,
    rules: [],
    title: 'name',
    image: null,
    resourceEndpointMethod: 'get',
    resourceEndpointPath: `/api/${key}`,
    resourceEndpointDataKey: null,
    resourceTitle: 'name',
    resourceImage: null,
    displayAs: null,
    ...overrides
  } as FieldData
}

const fields: Record<string, FieldData> = {
  members: makeFieldData('members', { emptyOperators: true }),
  reviewers: makeFieldData('reviewers')
}

function mountFilter(filters: any[]) {
  const registry = new FieldRegistry()

  registry.register('related_many', (ctx, field) => {
    return new RelatedManyField(ctx, field, (async () => []) as any)
  })

  return mount(LensFormFilter, {
    props: {
      fields,
      filters,
      filterable: ['members', 'reviewers']
    },
    global: {
      provide: {
        [FieldRegistryKey as symbol]: registry
      }
    }
  })
}

describe('blocks/lens/components/LensFormFilter', () => {
  it('renders a valueless condition for a field that declares support', () => {
    const wrapper = mountFilter([['members', 'empty', null]])

    const conditions = wrapper.findAllComponents(LensFormFilterCondition)
    expect(conditions).toHaveLength(1)
    expect((conditions[0] as any).props('modelValue')).toEqual({
      field: 'members',
      operator: 'empty',
      value: null
    })

    wrapper.unmount()
  })

  it('prunes conditions whose operator the field does not offer', () => {
    // `reviewers` does not declare empty operator support, so a condition
    // injected through a hand-edited URL cannot be rendered or edited —
    // the form prunes it instead of throwing on mount, leaving the
    // initial blank condition.
    const wrapper = mountFilter([
      ['reviewers', 'empty', null],
      ['reviewers', 'contains', 'x']
    ])

    const conditions = wrapper.findAllComponents(LensFormFilterCondition)
    expect(conditions).toHaveLength(1)
    expect((conditions[0] as any).props('modelValue')).toEqual({
      field: null,
      operator: null,
      value: null
    })

    wrapper.unmount()
  })

  it('keeps editable conditions while pruning uneditable ones, groups included', () => {
    const wrapper = mountFilter([
      ['members', 'in', [1]],
      ['$or', [['reviewers', 'empty', null]]]
    ])

    const conditions = wrapper.findAllComponents(LensFormFilterCondition)
    expect(conditions).toHaveLength(1)
    expect((conditions[0] as any).props('modelValue')).toEqual({
      field: 'members',
      operator: 'in',
      value: [1]
    })

    wrapper.unmount()
  })
})
