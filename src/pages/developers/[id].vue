<template>
  <div v-if="data === null || data === null">
    loading
  </div>
  <div v-else class="flex flex-col items-center">
    <GamesHeader :header-data="data" />
    <div class="flex justify-center w-full mt-10">
      <div class="flex flex-row w-full max-w-screen-lg gap-12 xl:max-w-screen-xl">
        <CardGallery :games="games" :game-data="gameData" @fetch-next="fetchNext" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CategoryGames, CategoryData, Game } from '@/api/types'
import { getDeveloperGames, getDeveloperData } from '@/api'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
let id = route.params.id as string
let page = 1

const data = ref<CategoryData | null>(null)
const gameData = ref<CategoryGames | null>(null)
const games = ref<Game[] | null>(null)

onMounted(async() => {
  data.value = await getDeveloperData(id)

  id = data.value.id.toString()

  gameData.value = await getDeveloperGames(id, page)
  games.value = gameData.value?.results || []
})

async function fetchNext() {
  page++
  gameData.value = await getDeveloperGames(id, page)
  games.value = [...games.value, ...gameData.value?.results]
}
</script>
