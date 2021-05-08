<template>
  <YoSection v-if="games?.length !== 0" :title="title" class="w-full">
    <div class="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4 justify-center w-full">
      <router-link v-for="g in games" :key="g.id" class="flex justify-center" :to="`/game/${g.id}`">
        <GameCard :name="g.name" :image="g.background_image" />
      </router-link>
    </div>
  </YoSection>
</template>

<script setup lang="ts">
import type { CategoryGames, Game } from '@/api/types'
import { defineProps, ref, watch, defineEmit } from 'vue'
import type { PropType } from 'vue'
import { useWindowScroll } from '@vueuse/core'

const props = defineProps({
  gameData: {
    type: Object as PropType<CategoryGames | null>,
    default: null,
  },
  games: {
    type: Object as PropType<Game[] | null>,
    default: null,
  },
  title: {
    type: String,
    default: '',
  },
})

const developerGameData = ref<CategoryGames | null>(null)

watch(() => props.gameData, gameData => developerGameData.value = gameData)

const emit = defineEmit(['fetch-next'])

const { y } = useWindowScroll()

watch(y, () => {
  const bottomOfWindow = (window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight
  if (bottomOfWindow && developerGameData.value?.next !== null)
    emit('fetch-next')
})
</script>
