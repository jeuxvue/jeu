import api from './axios'

import { Game, ApiRedirect, ApiError, CategoryGames, CategoryData, AchievementData } from './types'

export * from './games'
export * from './supabase'

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
  return api.get<CategoryGames>('games', { params }).then(r => r.data)
}

export async function getDeveloperData(id: number | string) {
  return api.get<CategoryData>(`developers/${id}`).then(r => r.data)
}

export async function getPublisherGames(id: number | string, page: number) {
  const params = { publishers: id, page }
  return api.get<CategoryGames>('games', { params }).then(r => r.data)
}

export async function getPublisherData(id: number | string) {
  return api.get<CategoryData>(`publishers/${id}`).then(r => r.data)
}

export async function getGenreGames(id: number | string, page: number) {
  const params = { genres: id, page }
  return api.get<CategoryGames>('games', { params }).then(r => r.data)
}

export async function getGenreData(id: number | string) {
  return api.get<CategoryData>(`genres/${id}`).then(r => r.data)
}

export async function getTagGames(id: number | string, page: number) {
  const params = { tags: id, page }
  return api.get<CategoryGames>('games', { params }).then(r => r.data)
}

export async function getTagData(id: number | string) {
  return api.get<CategoryData>(`tags/${id}`).then(r => r.data)
}

export async function getGameAchievements(id: number | string, page: number) {
  const params = { page }
  return api.get<AchievementData>(`games/${id}/achievements`, { params }).then(r => r.data)
}

export async function getGameAdditions(id: number | string, page: number) {
  const params = { page }
  return api.get<CategoryGames>(`games/${id}/additions`, { params }).then(r => r.data)
}

export async function getGameSeries(id: number | string, page: number) {
  const params = { page }
  return api.get<CategoryGames>(`games/${id}/game-series`, { params }).then(r => r.data)
}
