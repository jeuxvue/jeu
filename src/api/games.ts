import api from './axios'

import { CategoryGames } from './types'

interface SearchParams {
  search: string
  ordering: string // '-metacritic' | 'metacritic'
  page: number
}

export async function getGames(params?: Partial<SearchParams>) {
  return api.get<CategoryGames>('games', { params }).then(r => r.data)
}
