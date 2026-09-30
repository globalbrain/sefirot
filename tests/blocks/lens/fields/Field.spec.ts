import { type FieldContext } from 'sefirot/blocks/lens/FieldContext'
import {
  type AvatarFieldData,
  type BooleanFieldData,
  type ContentFieldData,
  type FieldDataBase,
  type NumberFieldData,
  type RelatedManyFieldData,
  type TextFieldData
} from 'sefirot/blocks/lens/FieldData'
import { type ResourceFetcher } from 'sefirot/blocks/lens/ResourceFetcher'
import { AvatarField } from 'sefirot/blocks/lens/fields/AvatarField'
import { BooleanField } from 'sefirot/blocks/lens/fields/BooleanField'
import { ContentField } from 'sefirot/blocks/lens/fields/ContentField'
import { type Field } from 'sefirot/blocks/lens/fields/Field'
import { NumberField } from 'sefirot/blocks/lens/fields/NumberField'
import { RelatedManyField } from 'sefirot/blocks/lens/fields/RelatedManyField'
import { TextField } from 'sefirot/blocks/lens/fields/TextField'

function ctx(lang: 'en' | 'ja' = 'en'): FieldContext {
  return { lang }
}

function base(overrides: Partial<FieldDataBase> = {}): FieldDataBase {
  return {
    key: 'name',
    labelEn: 'Name',
    labelJa: '名前',
    filterKey: 'name',
    sortable: true,
    freeze: false,
    width: 0,
    required: false,
    rules: [],
    ...overrides
  }
}

const emptyText = { emptyTextEn: 'Untitled', emptyTextJa: '無題' }

function text(overrides: Partial<TextFieldData> = {}, lang: 'en' | 'ja' = 'en'): TextField {
  return new TextField(ctx(lang), {
    ...base(),
    type: 'text',
    placeholderEn: null,
    placeholderJa: null,
    helpEn: null,
    helpJa: null,
    unitBefore: null,
    unitAfter: null,
    ...overrides
  })
}

function cellFor(field: Field<any>, v: any, r: any = {}): any {
  const cell = field.tableColumn().cell
  return typeof cell === 'function' ? cell(v, r) : cell
}

describe('blocks/lens/fields/Field', () => {
  describe('empty text', () => {
    it('renders the empty text in a muted color for a blank cell', () => {
      const field = text(emptyText)

      for (const v of [null, undefined, '']) {
        expect(cellFor(field, v)).toEqual({ type: 'text', value: 'Untitled', color: 'mute' })
      }
    })

    it('renders the value as before when the cell has one', () => {
      expect(cellFor(text(emptyText), 'Alice')).toEqual({ type: 'text', value: 'Alice' })
    })

    it('keeps blank cells blank when the definition declares no empty text', () => {
      expect(cellFor(text(), null)).toEqual({ type: 'text', value: null })
      expect(cellFor(text({ emptyTextEn: null, emptyTextJa: null }), null)).toEqual({ type: 'text', value: null })
      expect(cellFor(text({ emptyTextEn: '', emptyTextJa: '' }), '')).toEqual({ type: 'text', value: '' })
    })

    it('resolves the empty text by the current language', () => {
      expect(text(emptyText, 'en').emptyText()).toBe('Untitled')
      expect(text(emptyText, 'ja').emptyText()).toBe('無題')
      expect(cellFor(text(emptyText, 'ja'), null).value).toBe('無題')

      // A language without its own text keeps the cell blank.
      expect(text({ emptyTextEn: 'Untitled' }, 'ja').emptyText()).toBe(null)
      expect(cellFor(text({ emptyTextEn: 'Untitled' }, 'ja'), null)).toEqual({ type: 'text', value: null })
    })

    it('treats `false` and `0` as values, not blanks', () => {
      const boolean = new BooleanField(ctx(), {
        ...base(),
        ...emptyText,
        type: 'boolean',
        labelTrueEn: null,
        labelTrueJa: null,
        labelFalseEn: null,
        labelFalseJa: null
      } satisfies BooleanFieldData)
      const number = new NumberField(ctx(), {
        ...base(),
        ...emptyText,
        type: 'number',
        align: 'right',
        separator: null,
        abbr: null,
        fractionDigits: null
      } satisfies NumberFieldData)

      expect(cellFor(boolean, false).value).toBe('No')
      expect(cellFor(number, 0).value).toBe(0)
      expect(cellFor(boolean, null)).toEqual({ type: 'text', value: 'Untitled', color: 'mute' })
      // The empty text keeps the column's alignment.
      expect(cellFor(number, null)).toEqual({ type: 'text', align: 'right', value: 'Untitled', color: 'mute' })
    })

    it('treats an empty list as blank', () => {
      const field = new RelatedManyField(ctx(), {
        ...base({ key: 'members', filterKey: 'id' }),
        ...emptyText,
        type: 'related_many',
        title: 'name',
        resourceEndpointMethod: 'get',
        resourceEndpointPath: '/api/users',
        resourceEndpointDataKey: null,
        resourceTitle: 'name',
        displayAs: 'pills'
      } satisfies RelatedManyFieldData, (async () => ({})) as unknown as ResourceFetcher)

      expect(cellFor(field, [])).toEqual({ type: 'text', value: 'Untitled', color: 'mute' })
      expect(cellFor(field, [{ id: 1, name: 'Alice' }]).type).toBe('pills')
    })

    it('does not apply to content and avatar fields', () => {
      const content = new ContentField(ctx(), {
        ...base({ key: 'notice' }),
        ...emptyText,
        type: 'content',
        bodyEn: 'Body',
        bodyJa: 'Body'
      } satisfies ContentFieldData)
      const avatar = new AvatarField(ctx(), {
        ...base({ key: 'photo' }),
        ...emptyText,
        type: 'avatar'
      } satisfies AvatarFieldData)

      expect(cellFor(content, undefined)).toEqual({ type: 'empty' })
      expect(cellFor(avatar, null)).toEqual({ type: 'avatar', image: null, name: '' })
    })
  })
})
