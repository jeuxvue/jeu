import api from './axios'

import { CategoryGames } from './types'

export async function getGames(opts: { page: number }) {
  const params = { ordering: '-metacritic', ...opts }
  return api.get<CategoryGames>('games', { params }).then(r => r.data)
}
