import { type Lang } from '../../composables/Lang'

export interface LensQuery {
  entity: string
  select: string[]
  filters: any[]
  sort: LensQuerySort[]
  settings?: LensQuerySettings
  page: number
  perPage: number
}

export type LensQuerySort = [key: string, direction: 'asc' | 'desc']

export interface LensQuerySettings {
  lang?: Lang
  tz?: string
}
