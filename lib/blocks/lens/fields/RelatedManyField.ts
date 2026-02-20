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

  override tableCell(v: any, _r: any): TableCell {
    return {
      type: 'pills',
      pills: v.map((item: any) => ({
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
