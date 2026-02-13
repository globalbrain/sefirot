export interface LensQuery {
  entity: string
  select: string[]
  filters: any[]
  sort: LensQuerySort[]
  page: number
  perPage: number
}

export type LensQuerySort = [key: string, direction: 'asc' | 'desc']
