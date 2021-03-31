<template>
  <CardGallery
    :game-data="gameData"
    :data="data"
    :games="games"
    @fetch-next="fetchNext"
  />
</template>

<script setup lang="ts">
import type { DeveloperGame, DeveloperData, Game } from '@/api/types'
import { getPublisherGames, getPublisherData } from '@/api'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
let id = route.params.id as string
let page = 1

const data = ref<DeveloperData | null>(null)
const gameData = ref<DeveloperGame | null>(null)
const games = ref<Game[] | null>(null)

onMounted(async() => {
  data.value = await getPublisherData(id)

  id = data.value.id.toString()

  gameData.value = await getPublisherGames(id, page)
  games.value = gameData.value?.results || []
})

async function fetchNext() {
  page++
  gameData.value = await getPublisherGames(id, page)
  games.value = [...games.value, ...gameData.value?.results]
}
</script>
