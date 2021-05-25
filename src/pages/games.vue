<template>
  <template v-if="data === null">
    <div>
      loading
    </div>
  </template>
  <template v-else>
    <div class="flex flex-col max-w-screen-lg m-auto xl:max-w-screen-xl">
      <YoBox class="flex items-end w-full gap-4 mt-8">
        <InputWrap class="flex-grow" title="Search for a game">
          <InputText v-model="searchQuery" class="w-full" @keydown.enter="handleSearch" />
        </InputWrap>
        <InputWrap title="Order by">
          <div class="flex gap-4">
            <Dropdown v-model="searchOrdering" :options="orderingOptions" class="w-min" />
            <Dropdown v-model="searchOrder" :options="orderOptions" class="w-min" />
          </div>
        </InputWrap>
        <!-- <InputWrap title="">
        <Dropdown v-model="searchOrder" :options="orderOptions" class="w-full" />
      </InputWrap> -->
        <button class="btn btn-primary" @click="handleSearch">
          Search
        </button>
      </YoBox>
    </div>
    <div class="flex justify-center w-full mt-10">
      <div class="flex flex-row w-full max-w-screen-lg gap-12 xl:max-w-screen-xl">
        <CardGallery :games="games" :game-data="data" @fetch-next="fetchNext" />
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import type { CategoryGames, Game } from '@/api/types'
import { getGames } from '@/api'
import { onMounted, ref } from 'vue'

const data = ref<CategoryGames | null>(null)
const games = ref<Game[] | null>(null)

const orderingOptions = [
  {
    key: 'name',
    text: 'name',
  },
  {
    key: 'released',
    text: 'released',
  },
  {
    key: 'added',
    text: 'added',
  },
  {
    key: 'created',
    text: 'created',
  },
  {
    key: 'updated',
    text: 'updated',
  },
  {
    key: 'rating',
    text: 'rating',
  },
  {
    key: 'metacritic',
    text: 'metacritic',
  },
]

const orderOptions = [
  {
    key: '-',
    text: '👇',
  },
  {
    key: '',
    text: '☝',
  },
]

const searchQuery = ref<String>('')
const searchOrdering = ref<String>(orderingOptions[0].key)
const searchOrder = ref<String>(orderOptions[0].key)

const currentSearchParams = ref({
  search: '',
  ordering: '',
  page: 1,
})

onMounted(async() => {
  data.value = await getGames()
  games.value = data.value.results
})

async function handleSearch() {
  currentSearchParams.value = {
    search: searchQuery.value as string,
    ordering: `${searchOrder.value}${searchOrdering.value}` as string,
    page: 1,
  }
  data.value = await getGames(currentSearchParams.value)
  games.value = data.value.results
}

async function fetchNext() {
  currentSearchParams.value.page++
  data.value = await getGames(currentSearchParams.value)
  games.value = [...games.value, ...data.value.results]
}

</script>
