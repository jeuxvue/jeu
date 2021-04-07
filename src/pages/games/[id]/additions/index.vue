<template>
  <div v-if="additions?.length === 0">
    No related games
  </div>
  <div v-else>
    <YoSection>
      <div class="flex gap-12 flex-wrap w-full">
        <router-link v-for="a in additions" :key="a.id" :to="`/games/${a.id}`">
          <GameCard :name="a.name" :image="a.background_image" />
        </router-link>
      </div>
    </YoSection>
  </div>
</template>

<script setup lang="ts">
import type { DeveloperGame, Game } from '@/api/types'
import { getGameAdditions } from '@/api/index'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const additionData = ref<DeveloperGame | null>(null)
const additions = ref<Game[] | null>([])

async function fetchGameAdditions() {
  const response = await getGameAdditions(id as string)
  if (response !== null) {
    additionData.value = response
    additions.value = [...additions.value, ...response.results]
  }
}

onMounted(async() => {
  await fetchGameAdditions()
})
</script>
