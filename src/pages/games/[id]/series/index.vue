<template>
  <div v-if="games?.length === 0">
    No games in series
  </div>
  <div v-else>
    <YoSection>
      <div class="flex gap-12 flex-wrap">
        <router-link v-for="g in games" :key="g.id" :to="`/games/${g.id}`">
          <GameCard :name="g.name" :image="g.background_image" />
        </router-link>
      </div>
    </YoSection>
  </div>
</template>

<script setup lang="ts">
import type { DeveloperGame, Game } from '@/api/types'
import { getGameSeries } from '@/api/index'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const gameSeriesData = ref<DeveloperGame | null>(null)
const games = ref<Game[] | null>([])

let page = 1

function scroll() {
  window.onscroll = () => {
    const bottomOfWindow = (window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight
    if (bottomOfWindow && gameSeriesData.value?.next !== null) {
      fetchGameSeries()
      page++
    }
  }
}

async function fetchGameSeries() {
  const response = await getGameSeries(id as string, page)
  if (response !== null) {
    gameSeriesData.value = response
    games.value = [...games.value, ...response.results]
  }
}

onMounted(async() => {
  await fetchGameSeries()
  page++
  scroll()
})
</script>
