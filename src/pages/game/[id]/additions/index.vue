<template>
  <div v-if="games?.length === 0">
    No related games
  </div>
  <div v-else>
    <CardGallery :games="games" :game-data="gameData" @fetch-next="fetchNext" />
  </div>
</template>

<script setup lang="ts">
import type { CategoryGames, Game } from '@/api/types'
import { getGameAdditions } from '@/api/index'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const gameData = ref<CategoryGames | null>(null)
const games = ref<Game[] | null>(null)
let page = 1

async function fetchNext() {
  page++
  gameData.value = await getGameAdditions(id as string, page)
  games.value = [...games.value, ...gameData.value?.results]
}

onMounted(async() => {
  gameData.value = await getGameAdditions(id as string, page)
  games.value = gameData.value?.results || []
})
</script>
