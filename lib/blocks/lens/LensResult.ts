import { type FieldData } from './FieldData'
import { type LensQuery } from './LensQuery'

export interface LensResult {
  query: LensQuery
  fields: Record<string, FieldData>
  data: Record<string, any>[]
  pagination: LensResultPaginationMeta
}

export interface LensResultPagination<T> {
  data: T[]
  meta: LensResultPaginationMeta
}

export interface LensResultPaginationMeta {
  total: number
  page: number
  perPage: number
}
