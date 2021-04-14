<template>
  <YoSection v-if="developerGames?.length !== 0" :title="title" class="w-full">
    <div :class="formattedGap" class="flex flex-wrap w-full">
      <router-link v-for="g in developerGames" :key="g.id" :to="`/games/${g.id}`">
        <GameCard :name="g.name" :image="g.background_image" />
      </router-link>
    </div>
  </YoSection>
</template>

<script setup lang="ts">
import type { DeveloperGame, Game } from '@/api/types'
import { defineProps, ref, watch, defineEmit, computed } from 'vue'
import type { PropType } from 'vue'
import { useWindowScroll } from '@vueuse/core'

const props = defineProps({
  gameData: {
    type: Object as PropType<DeveloperGame | null>,
    default: null,
  },
  games: {
    type: Object as PropType<Game[] | null>,
    default: null,
  },
  gap: {
    type: Number,
    default: 8,
  },
  title: {
    type: String,
    default: '',
  },
})

const formattedGap = computed(() => `gap-${props.gap}`)

const developerGameData = ref<DeveloperGame | null>(null)
const developerGames = ref<Game[] | null>([])

watch(() => props.gameData, gameData => developerGameData.value = gameData)

watch(() => props.games, games => developerGames.value = games)

const emit = defineEmit(['fetch-next'])

const { y } = useWindowScroll()

watch(y, () => {
  const bottomOfWindow = (window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight
  if (bottomOfWindow && developerGameData.value?.next !== null)
    emit('fetch-next')
})
</script>
