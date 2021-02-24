import api from './axios'

import { Game, Redirect } from './types'

export function getGame(id: number | string) {
  return api.get<Game | Redirect | Error>(`games/${id}`).then(r => r.data)
}

export async function fetchGame(id: number | string): Promise<Game> {
  const res = await fetch(`https://api.rawg.io/api/games/${id as string}?key=${import.meta.env.VITE_API_RAWG_KEY}`)
  const data = await res.json() as Game | Redirect

  if ('redirect' in data)
    return fetchGame(data.slug)

  return data
}
