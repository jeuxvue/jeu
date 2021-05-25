<script setup lang="ts">
import { useList, useUser, getGamesByIds, removeFromList, updateList, getUser } from '@/api'
import type { Game } from '@/api/types'
import { onMounted, watchEffect, watch, ref, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const userId = route.params.id as string
const list = useList(userId)
const currentUser = useUser()

const user = ref<null | any>(null)

onMounted(async() => {
  user.value = reactive(await getUser(userId))

  console.log(user.value)
})

const isMe = computed(() => {
  return userId === currentUser.value?.id || false
})

function handleRemoveFromList(gameId: number) {
  if (currentUser.value)
    removeFromList(currentUser.value?.id, Number(gameId))
}

const score = ref(0)

function handleChangeStatus(e, gameId: number) {
  updateList(
    {
      user_id: currentUser.value?.id,
      game_id: gameId,
    },
    {
      status: e.target.value,
    },
  )
}

function handleChangeScore(e, gameId: number) {
  let score = e.target.value
  if (score > 10)
    score = 10
  else if (score < 0)
    score = 0

  updateList(
    {
      user_id: currentUser.value?.id,
      game_id: gameId,
    },
    {
      score,
    },
  )
}

const sortBy = ref('Everything')

function selectSort(by: string) {
  sortBy.value = by
}

const games = computed(() => {
  if (!list.value) return []
  if (sortBy.value === 'Everything') {
    return list.value.sort((a, b) => b.score - a.score)
  }
  else {
    return list.value
      .filter(el => el.status?.toLowerCase() === sortBy.value?.toLowerCase())
      .sort((a, b) => b.score - a.score)
  }
})

watch(list, async() => {
  if (list.value !== null) {
    console.log(list.value)
    const ids = list.value.map(el => el.game_id)
    games.value = await getGamesByIds(ids)
  }
}, { immediate: true })
</script>

<template>
  <div>
    <div class="flex justify-center">
      <div class="max-w-screen-lg w-full flex flex-row gap-8 mt-8">
        <YoBox class="flex flex-col">
          <img class="ro unded-full w-48 h-48" :src="user?.avatar" alt="">
          <div class="mt-4 text-3xl font-semibold tracking-wide">
            {{ user?.name }}
          </div>
          <div class="text-xl text-gray-500">
            {{ user?.email }}
          </div>
          <template v-if="isMe">
            <button class="btn dark:bg-gray-900 bg-blue-gray-200 w-full mt-8">
              edit profile
            </button>
          </template>
        </YoBox>
        <div class="flex flex-col gap-4 flex-grow">
          <YoBox class="flex justify-around gap-2 p-1 h-12">
            <button
              class="w-full flex items-center justify-center rounded hover:(bg-gray-500 text-white)"
              :class="{'bg-gray-500 text-white': sortBy === 'Everything'}"
              @click="selectSort('Everything')"
            >
              Everything
            </button>
            <button
              class="w-full flex items-center justify-center rounded hover:(bg-green-500 text-white)"
              :class="{'bg-green-500 text-white': sortBy === 'Completed'}"
              @click="selectSort('Completed')"
            >
              Completed
            </button>
            <button
              class="w-full flex items-center justify-center rounded hover:(bg-cyan-500 text-white)"
              :class="{'bg-cyan-500 text-white': sortBy === 'Playing'}"
              @click="selectSort('Playing')"
            >
              Playing
            </button>
            <button
              class="w-full flex items-center justify-center rounded hover:(bg-amber-500 text-white)"
              :class="{'bg-amber-500 text-white': sortBy === 'Planned'}"
              @click="selectSort('Planned')"
            >
              Planned
            </button>
            <button
              class="w-full flex items-center justify-center rounded hover:(bg-red-500 text-white)"
              :class="{'bg-red-500 text-white': sortBy === 'Dropped'}"
              @click="selectSort('Dropped')"
            >
              Dropped
            </button>
          </YoBox>
          <YoBox class="">
            <template v-for="game of games" :key="game.id">
              <div class=" flex flex-row gap-4 items-center dark:hover:bg-gray-900 hover:bg-blue-gray-100 rounded px-4 py-2">
                <img class="h-12 w-12 object-cover rounded" :src="game.game_cover" alt="">
                <div class="text-xl">
                  {{ game.game_name }}
                </div>
                <input :disabled="!isMe" :value="game.score || 0" class="ml-auto w-10 dark:bg-gray-900 bg-blue-gray-100 text-gray-500 px-2 py-1 rounded" type="text" @change="handleChangeScore($event, game.game_id)">
                <select :disabled="!isMe" :value="game.status || 'none'" class=" dark:bg-gray-900 bg-blue-gray-100 text-gray-500 px-2 py-1 rounded" @change="handleChangeStatus($event, game.game_id)">
                  <option value="none">
                    None
                  </option>
                  <option value="completed">
                    Completed
                  </option>
                  <option value="playing">
                    Playing
                  </option>
                  <option value="planned">
                    Planned
                  </option>
                  <option value="dropped">
                    Dropped
                  </option>
                </select>
                <template v-if="isMe">
                  <button class="link " @click="handleRemoveFromList(game.game_id)">
                    <i-carbon:close class="w-8 h-8" />
                  </button>
                </template>
              </div>
            </template>
          </YoBox>
        </div>
      </div>
    </div>
  </div>
</template>
