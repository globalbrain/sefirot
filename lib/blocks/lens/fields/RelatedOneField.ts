import { xor } from 'lodash-es'
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

    const res = await this.fetcher(method, url)
    const data = key ? res[key] : res

    const isAvatar = this.data.displayAs === 'avatar'

    const options = data.map((item: any) => isAvatar
      ? {
          type: 'avatar' as const,
          label: item[this.data.resourceTitle],
          image: this.data.resourceImage ? item[this.data.resourceImage] : null,
          value: item[this.data.filterKey]
        }
      : {
          label: item[this.data.resourceTitle],
          value: item[this.data.filterKey]
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
        return { type: 'avatar', image: null, name: null }
      }
      return { type: 'text', value: null }
    }

    if (this.data.displayAs === 'avatar') {
      return {
        type: 'avatar',
        image: this.data.image ? (v[this.data.image] ?? null) : null,
        name: v[this.data.title] ?? null
      }
    }

    return {
      type: 'text',
      value: v[this.data.title] ?? null
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
      const res = await this.fetcher(method, url)
      const data = key ? res[key] : res
      return data.map((item: any) => ({
        value: item[this.data.filterKey],
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

  override dataListItemComponent(): any {
    throw new Error('Not implemented.')
  }

  override formInputComponent() {
    throw new Error('Not implemented.')
  }
}
