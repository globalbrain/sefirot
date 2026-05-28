import { xor } from 'lodash-es'
import { type DropdownSection } from '../../../composables/Dropdown'
import { type TableCell } from '../../../composables/Table'
import { type RelatedManyFieldData } from '../FieldData'
import { type FilterOperator } from '../FilterOperator'
import { type ResourceFetcher } from '../ResourceFetcher'
import { type FilterInput } from '../filter-inputs/FilterInput'
import { SelectFilterInput } from '../filter-inputs/SelectFilterInput'
import { Field } from './Field'

export class RelatedManyField extends Field<RelatedManyFieldData> {
  fetcher: ResourceFetcher

  constructor(ctx: any, data: RelatedManyFieldData, fetcher: ResourceFetcher) {
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

    const isAvatar = this.data.displayAs === 'avatars'

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
    const items = (v ?? []) as any[]

    if (this.data.displayAs === 'avatars') {
      return {
        type: 'avatars',
        avatars: items.map((item) => ({
          image: this.data.image ? item[this.data.image] : null,
          name: item[this.data.title]
        })),
        avatarCount: 6,
        nameCount: 0,
        tooltip: true
      }
    }

    return {
      type: 'pills',
      pills: items.map((item) => ({
        label: item[this.data.title],
        value: item[this.data.filterKey]
      }))
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
