import { createClient, User } from '@supabase/supabase-js'
import { ref } from 'vue'
import type { CategoryGames } from './types'
import api from './axios'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL as string, import.meta.env.VITE_SUPABASE_KEY as string)

export async function signInGithub() {
  const { user, error } = await supabase.auth.signIn({
    provider: 'github',
  })

  if (error) console.error(error)

  return user
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
}

export function useUser() {
  const user = ref<null | User>(null)

  if (!user.value)
    user.value = supabase.auth.user()

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT')
      user.value = null
    else if (event === 'SIGNED_IN')
      user.value = session?.user ?? null
  })

  return user
}

const list = ref<null | any[]>(null)

export function useList() {
  if (!list.value) {
    (async() => {
      const { data, error } = await supabase
        .from('list')
        .select('*')

      list.value = data
    })()
  }

  supabase
    .from('list')
    .on('*', (payload) => {
      console.log('Change received!', payload)
      ;(async() => {
        const { data, error } = await supabase
          .from('list')
          .select('*')

        list.value = data
      })()
    })
    .subscribe()

  return list
}

export async function getGamesByIds(ids: string[]) {
  // https://api.rawg.io/api/games?key=b990ed28f3654d709863b901d6d6fc56&id={game_id,game_id}&page_size={amount_of_game_ids}

  return api.get<CategoryGames>('games', { params: { id: ids.join(','), page_size: ids.length } }).then(r => r.data.results)
}

export async function addToList(params: {
  userId: string
  gameId: number
  gameCover: string
  gameName: string
}) {
  const { data, error } = await supabase
    .from('list')
    .insert([
      {
        user_id: params.userId,
        game_id: params.gameId,
        game_cover: params.gameCover,
        game_name: params.gameName,
      },
    ])

  return data
}

export async function removeFromList(userId: string, gameId: number) {
  console.log({
    user_id: userId,
    game_id: String(gameId),
  })
  const { data, error } = await supabase
    .from('list')
    .delete()
    .eq('user_id', userId)
    .eq('game_id', String(gameId))

  console.log(data, error)

  return data
}

export async function updateList(match: any, toUpdate: any) {
  const { data, error } = await supabase
    .from('list')
    .update(toUpdate)
    .match(match)

  return data
}

export async function getUser(id: string) {
  console.log(id)
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .match({ id })

  console.log(data)

  if (!data) return null
  return {
    ...data[0],
    avatar: data[0]?.raw_user_meta_data?.avatar_url,
    name: data[0]?.raw_user_meta_data?.full_name,
  }
}
