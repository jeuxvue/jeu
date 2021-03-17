import api from './axios'

import { Game, ApiRedirect, ApiError, DeveloperGame, DeveloperData } from './types'

export function getGame(id: number | string) {
  return api.get<Game | ApiRedirect | ApiError>(`games/${id}`).then(r => r.data)
}

export async function fetchGame(id: number | string): Promise<Game> {
  const res = await fetch(`https://api.rawg.io/api/games/${id as string}?key=${import.meta.env.VITE_API_RAWG_KEY}`)
  const data = await res.json() as Game | ApiRedirect

  if ('redirect' in data)
    return fetchGame(data.slug)

  return data
}

export async function getDeveloperGames(id: number | string, page: number) {
  const params = { developers: id, page }
  return api.get<DeveloperGame>('games', { params }).then(r => r.data)
}

export async function getDeveloperData(id: number | string) {
  return api.get<DeveloperData>(`developers/${id}`).then(r => r.data)
}
