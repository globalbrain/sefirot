import { xor } from 'lodash-es'
import { h } from 'vue'
import SDescAvatar from '../../../components/SDescAvatar.vue'
import { type DropdownSection } from '../../../composables/Dropdown'
import { type TableCell } from '../../../composables/Table'
import { type RelatedOneFieldData } from '../FieldData'
import { type FilterOperator } from '../FilterOperator'
import { type ResourceFetcher } from '../ResourceFetcher'
import { type FilterInput } from '../filter-inputs/FilterInput'
import { SelectFilterInput } from '../filter-inputs/SelectFilterInput'
import { Field } from './Field'

export class RelatedOneField extends Field<RelatedOneFieldData> {
  fetcher: ResourceFetcher

  constructor(ctx: any, data: RelatedOneFieldData, fetcher: ResourceFetcher) {
    super(ctx, data)
    this.fetcher = fetcher
  }

  override async tableFilterMenu(filters: any[], onFilterUpdated: (filters: any[]) => void): Promise<DropdownSection | null> {
    const method = this.data.resourceEndpointMethod
    const url = this.data.resourceEndpointPath
    const key = this.data.resourceEndpointDataKey

    if (!url) {
      return null
    }

    const selected = this.inFilterValueFor(this.data.key, filters)

    const res = await this.fetcher(method, url, this.data.resourceEndpointBody)
    const data = key ? res[key] : res

    const isAvatar = this.data.displayAs === 'avatar'

    const options = data.map((item: any) => isAvatar
      ? {
          type: 'avatar' as const,
          label: item[this.data.resourceTitle],
          image: this.data.resourceImage ? item[this.data.resourceImage] : null,
          value: this.resolveValue(item[this.data.filterKey])
        }
      : {
          label: item[this.data.resourceTitle],
          value: this.resolveValue(item[this.data.filterKey])
        })

    return {
      type: 'filter',
      search: true,
      selected,
      options,
      onClick: (v) => { onFilterUpdated?.([this.data.key, 'in', xor(selected, [v])]) }
    }
  }

  override tableCell(v: any, _r: any): TableCell {
    if (v === null || v === undefined) {
      if (this.data.displayAs === 'avatar') {
        return { type: 'avatar', image: null, name: '' }
      }
      return { type: 'text', value: null }
    }

    if (this.data.displayAs === 'avatar') {
      return {
        type: 'avatar',
        image: this.data.image ? (v[this.data.image] ?? null) : null,
        // Empty string (not null) for the same reason as the text branch
        // below — a null name falls back to the raw row value in the cell
        // renderer and breaks SAvatar.
        name: v[this.data.title] ?? ''
      }
    }

    return {
      type: 'text',
      // Empty string (not null) when the title is missing: the table
      // renderer falls back to the raw row value on a null cell value,
      // which would render the relation object as `[object Object]`.
      value: v[this.data.title] ?? ''
    }
  }

  override availableFilters(): Partial<Record<FilterOperator, FilterInput>> {
    const method = this.data.resourceEndpointMethod
    const url = this.data.resourceEndpointPath
    const key = this.data.resourceEndpointDataKey

    if (!url) {
      return {}
    }

    const optionsResolver = async () => {
      const res = await this.fetcher(method, url, this.data.resourceEndpointBody)
      const data = key ? res[key] : res
      return data.map((item: any) => ({
        value: this.resolveValue(item[this.data.filterKey]),
        label: item[this.data.resourceTitle]
      }))
    }

    const selectOne = new SelectFilterInput().options(optionsResolver)
    const selectMany = new SelectFilterInput().options(optionsResolver).multiple()

    return {
      '=': selectOne,
      '!=': selectOne,
      'in': selectMany
    }
  }

  // Lens id fields serialize as `{ value, display, path? }`; filters need the
  // raw scalar. Unwrap that shape, passing plain scalars through untouched.
  // (Mirrors `RelatedManyField` — relevant when a related-one resource reuses
  // a Lens search endpoint whose `filterKey` is an id field.)
  private resolveValue(raw: any): any {
    return raw !== null && typeof raw === 'object' && 'value' in raw ? raw.value : raw
  }

  override dataListItemComponent(): any {
    return this.defineDataListItemComponent((value) => {
      // related_one serializes as a single relation object (or null). Read the
      // display name / image from the same keys `tableCell()` uses, instead of
      // letting the generic fallback render the raw object as JSON.
      if (value === null || value === undefined) {
        return null
      }

      const name = value[this.data.title] ?? null

      if (this.data.displayAs === 'avatar') {
        return h(SDescAvatar, {
          avatar: {
            avatar: this.data.image ? (value[this.data.image] ?? null) : null,
            name
          }
        })
      }

      // 'text' (and the null default): render the title as plain text, falling
      // back to the empty placeholder when the title key is missing.
      return name
    })
  }

  override formInputComponent() {
    throw new Error('Not implemented.')
  }
}
