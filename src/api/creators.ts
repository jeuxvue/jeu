import api from './axios'

import { CategoryCreators } from './types'

interface SearchParams {
  search: string
  page: number
  page_size: number
}

export async function getPublishers(params?: Partial<SearchParams>) {
  return api.get<CategoryCreators>('publishers', { params }).then(r => r.data)
}

export async function getDevelopers(params?: Partial<SearchParams>) {
  return api.get<CategoryCreators>('developers', { params }).then(r => r.data)
}
