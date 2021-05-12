import api from './axios'

import { CategoryGames } from './types'

export async function getGames(opts?: { page: number }) {
  const params = { ordering: '-metacritic', ...opts }
  return api.get<CategoryGames>('games', { params }).then(r => r.data)
}

export async function getGamesBySearch(query: String) {
  const params = { search: query, ordering: '-metacritic' }
  return api.get<CategoryGames>('games', { params }).then(r => r.data)
}
