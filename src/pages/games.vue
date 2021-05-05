<template>
  <div v-if="data === null || data === null">
    loading
  </div>
  <div v-else class="flex flex-col items-center">
    <div class="flex justify-center w-full mt-10">
      <div class="flex flex-row w-full max-w-screen-lg gap-12 xl:max-w-screen-xl">
        <CardGallery :games="games" :game-data="data" @fetch-next="fetchNext" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CategoryGames, Game } from '@/api/types'
import { getGames } from '@/api'
import { onMounted, ref } from 'vue'

let page = 1

const data = ref<CategoryGames | null>(null)
const games = ref<Game[] | null>(null)

onMounted(async() => {
  data.value = await getGames()
  games.value = data.value.results
})

async function fetchNext() {
  page++
  data.value = await getGames({ page })
  games.value = [...games.value, ...data.value.results]
}
</script>
