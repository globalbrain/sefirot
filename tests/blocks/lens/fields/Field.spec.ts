import { type FieldContext } from 'sefirot/blocks/lens/FieldContext'
import {
  type AvatarFieldData,
  type BooleanFieldData,
  type ContentFieldData,
  type FieldDataBase,
  type IdFieldData,
  type NumberFieldData,
  type RelatedManyFieldData,
  type RelatedOneFieldData,
  type SelectFieldData,
  type TextFieldData
} from 'sefirot/blocks/lens/FieldData'
import { type ResourceFetcher } from 'sefirot/blocks/lens/ResourceFetcher'
import { AvatarField } from 'sefirot/blocks/lens/fields/AvatarField'
import { BooleanField } from 'sefirot/blocks/lens/fields/BooleanField'
import { ContentField } from 'sefirot/blocks/lens/fields/ContentField'
import { type Field } from 'sefirot/blocks/lens/fields/Field'
import { IdField } from 'sefirot/blocks/lens/fields/IdField'
import { NumberField } from 'sefirot/blocks/lens/fields/NumberField'
import { RelatedManyField } from 'sefirot/blocks/lens/fields/RelatedManyField'
import { RelatedOneField } from 'sefirot/blocks/lens/fields/RelatedOneField'
import { SelectField } from 'sefirot/blocks/lens/fields/SelectField'
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
      // Blank and non-numeric strings render blank, so they show the empty text too.
      expect(cellFor(number, '  ').value).toBe('Untitled')
      expect(cellFor(number, 'abc').value).toBe('Untitled')
      expect(cellFor(number, '12').value).toBe(12)
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

    it('renders the empty text without calling a renderer that rejects blanks', () => {
      // A `state` select can't resolve an option for `undefined`.
      const field = new SelectField(ctx(), {
        ...base({ key: 'status' }),
        ...emptyText,
        type: 'select',
        displayAs: 'state',
        inputAs: 'dropdown',
        placeholderEn: null,
        placeholderJa: null,
        helpEn: null,
        helpJa: null,
        options: [{ mode: 'info', value: 'open', labelEn: 'Open', labelJa: 'Open' }],
        multiple: false
      } satisfies SelectFieldData)

      expect(cellFor(field, undefined)).toEqual({ type: 'text', value: 'Untitled', color: 'mute' })
      expect(cellFor(field, 'open')).toEqual({ type: 'state', mode: 'info', label: 'Open' })
    })

    it('treats an id without a display as blank and keeps its link', () => {
      const field = new IdField(ctx(), {
        ...base({ key: 'id' }),
        ...emptyText,
        type: 'id',
        prefix: 'DOC'
      } satisfies IdFieldData)

      expect(cellFor(field, { value: 1, display: null, path: '/documents/1' }))
        .toEqual({ type: 'text', value: 'Untitled', link: '/documents/1', color: 'mute' })
      expect(cellFor(field, { value: 1, display: '', path: null }))
        .toEqual({ type: 'text', value: 'Untitled', link: null, color: 'mute' })
      expect(cellFor(field, { value: 1, display: 'DOC-1', path: '/documents/1' }))
        .toEqual({ type: 'text', value: 'DOC-1', link: '/documents/1', color: 'info' })
    })

    it('treats a related record without a title as blank', () => {
      function relatedOne(overrides: Partial<RelatedOneFieldData> = {}): RelatedOneField {
        return new RelatedOneField(ctx(), {
          ...base({ key: 'owner', filterKey: 'id' }),
          ...emptyText,
          type: 'related_one',
          title: 'name',
          image: 'photo',
          resourceEndpointMethod: 'get',
          resourceEndpointPath: '/api/users',
          resourceEndpointDataKey: null,
          resourceTitle: 'name',
          ...overrides
        } satisfies RelatedOneFieldData, (async () => ({})) as unknown as ResourceFetcher)
      }

      const text = relatedOne({ displayAs: 'text' })
      expect(cellFor(text, { id: 1 })).toEqual({ type: 'text', value: 'Untitled', color: 'mute' })
      expect(cellFor(text, { id: 1, name: '' }).value).toBe('Untitled')
      // The image isn't rendered as text, so it doesn't count as a value here.
      expect(cellFor(text, { id: 1, name: null, photo: '/a.png' }).value).toBe('Untitled')
      expect(cellFor(text, { id: 1, name: 'Alice' })).toEqual({ type: 'text', value: 'Alice' })

      const avatar = relatedOne({ displayAs: 'avatar' })
      expect(cellFor(avatar, { id: 1, name: null, photo: null }).value).toBe('Untitled')
      expect(cellFor(avatar, { id: 1, name: null, photo: '/a.png' }))
        .toEqual({ type: 'avatar', image: '/a.png', name: '' })
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
