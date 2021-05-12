<template>
  <div v-if="data === null || data === null">
    loading
  </div>
  <div v-else class="flex flex-col max-w-screen-lg  xl:max-w-screen-xl m-auto">
    <YoBox>
      <InputWrap title="Search for a game">
        <InputText v-model="searchQuery" class="w-full" @keydown.enter="handleSearch" />
      </InputWrap>
    </YoBox>
    <div class="flex justify-center w-full mt-10">
      <div class="flex flex-row w-full max-w-screen-lg gap-12 xl:max-w-screen-xl">
        <CardGallery :games="games" :game-data="data" @fetch-next="fetchNext" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CategoryGames, Game } from '@/api/types'
import { getGames, getGamesBySearch } from '@/api'
import { onMounted, ref } from 'vue'

let page = 1

const data = ref<CategoryGames | null>(null)
const games = ref<Game[] | null>(null)
const searchQuery = ref<String>('')

onMounted(async() => {
  data.value = await getGames()
  games.value = data.value.results
})

async function handleSearch() {
  data.value = await getGamesBySearch(searchQuery.value)
  games.value = data.value.results
  searchQuery.value = ''
}

async function fetchNext() {
  page++
  data.value = await getGames({ page })
  games.value = [...games.value, ...data.value.results]
}

</script>
