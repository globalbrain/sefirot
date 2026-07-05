import { mount } from '@vue/test-utils'
import { type FieldContext } from 'sefirot/blocks/lens/FieldContext'
import { type SelectFieldData } from 'sefirot/blocks/lens/FieldData'
import { SelectField } from 'sefirot/blocks/lens/fields/SelectField'
import { DataListStateKey } from 'sefirot/composables/DataList'
import { computed } from 'vue'

function ctx(lang: 'en' | 'ja' = 'en'): FieldContext {
  return { lang }
}

function make(overrides: Partial<SelectFieldData> = {}): SelectField {
  const data: SelectFieldData = {
    type: 'select',
    key: 'choice',
    labelEn: 'Choice',
    labelJa: 'Choice',
    filterKey: 'choice',
    sortable: true,
    freeze: false,
    width: 0,
    required: false,
    rules: [],
    displayAs: 'text',
    inputAs: 'dropdown',
    placeholderEn: null,
    placeholderJa: null,
    helpEn: null,
    helpJa: null,
    options: [
      {
        mode: 'default',
        value: 'foo',
        labelEn: 'First',
        labelJa: 'First'
      },
      {
        mode: 'default',
        value: 'foobar',
        labelEn: 'Second',
        labelJa: 'Second'
      },
      {
        mode: 'default',
        value: 'baz',
        labelEn: 'Third',
        labelJa: 'Third'
      }
    ],
    multiple: false,
    ...overrides
  }

  return new SelectField(ctx(), data)
}

function mountDataListItem(field: SelectField, value: any) {
  return mount(field.dataListItemComponent(), {
    props: { value },
    global: {
      provide: {
        [DataListStateKey]: { labelWidth: computed(() => '100px') }
      }
    }
  })
}

describe('blocks/lens/fields/SelectField', () => {
  describe('dataListItemComponent', () => {
    it('renders only the exact option label for a single value', () => {
      const wrapper = mountDataListItem(make(), 'foobar')

      expect(wrapper.text()).toContain('Second')
      expect(wrapper.text()).not.toContain('First')
    })
  })

  describe('inputEmptyValue', () => {
    it('trusts the definition for the blank — the server owns it', () => {
      // A multiple select's definition carries `emptyValue: []`; without a
      // declared value the blank is null, with no client-side type fallback.
      expect(make().inputEmptyValue()).toBeNull()
      expect(make({ multiple: true, emptyValue: [] }).inputEmptyValue()).toEqual([])
    })

    it('starts from a server-declared initial value', () => {
      expect(make({ emptyValue: 'foobar' }).inputEmptyValue()).toBe('foobar')
      expect(make({ multiple: true, emptyValue: ['foo'] }).inputEmptyValue()).toEqual(['foo'])
    })
  })
})
