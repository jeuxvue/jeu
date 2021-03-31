<template>
  <div v-if="developerGameData === null || developerData === null">
    loading
  </div>
  <div v-else class="flex flex-col items-center">
    <div class="w-full bg-white dark:bg-gray-800 h-30" />
    <div class="flex flex-col items-center w-full pt-6">
      <div class="flex flex-row w-full max-w-screen-lg gap-12 px-12 xl:max-w-screen-xl">
        <div class="flex flex-col flex-shrink-0 gap-4 -mt-30 w-54">
          <img class="object-cover object-center w-full rounded h-72" :src="developerData?.image_background" alt="">
        </div>
        <div class="w-full">
          <div>
            <div class="flex w-full -mt-28">
              <div class="text-3xl">
                {{ developerData?.name }}
              </div>
              <LikeButton class="ml-auto" />
            </div>
            <DescriptionText v-if="developerData?.description" class="mt-20" :text="developerData?.description" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center w-full mt-10">
      <div class="flex flex-row w-full max-w-screen-lg gap-12 xl:max-w-screen-xl">
        <YoSection v-if="developerGames?.length !== 0" class="w-full" title="Developer's games">
          <div class="flex flex-wrap w-full gap-8">
            <router-link v-for="g in developerGames" :key="g.id" :to="`/games/${g.id}`">
              <GameCard :name="g.name" :image="g.background_image" />
            </router-link>
          </div>
        </YoSection>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DeveloperGame, DeveloperData, Game } from '@/api/types'
import { defineProps, ref, watch, defineEmit } from 'vue'
import type { PropType } from 'vue'
import { useWindowScroll } from '@vueuse/core'

const props = defineProps({
  gameData: {
    type: Object as PropType<DeveloperGame | null>,
    default: null,
  },
  data: {
    type: Object as PropType<DeveloperData | null>,
    default: null,
  },
  games: {
    type: Object as PropType<Game[] | null>,
    default: null,
  },
})

const developerData = ref<DeveloperData | null>(null)
const developerGameData = ref<DeveloperGame | null>(null)
const developerGames = ref<Game[] | null>([])

watch(() => props.gameData, gameData => developerGameData.value = gameData)
watch(() => props.data, data => developerData.value = data)
watch(() => props.games, games => developerGames.value = games)

const emit = defineEmit(['fetch-next'])

const { y } = useWindowScroll()

watch(y, () => {
  const bottomOfWindow = (window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight
  if (bottomOfWindow && developerGameData.value?.next !== null)
    emit('fetch-next')
})
</script>
