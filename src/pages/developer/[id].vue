<template>
  <div v-if="developerGameData === null || developerData === null">
    loading
  </div>
  <div v-else class="flex flex-col items-center">
    <div class="bg-white dark:bg-gray-800 w-full h-30" />
    <div class="flex flex-col items-center w-full pt-6">
      <div class="flex flex-row w-full max-w-screen-lg gap-12 px-12 xl:max-w-screen-xl">
        <div class=" flex flex-col flex-shrink-0 gap-4 -mt-30 w-54">
          <img class="object-cover object-center w-full rounded h-72" :src="developerData?.image_background" alt="">
        </div>
        <div class="w-full">
          <div>
            <div class="flex -mt-28 w-full">
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
        <YoSection v-if="developerGames.length !== 0" class="w-full" title="Developer's games">
          <div class="flex gap-8 w-full flex-wrap">
            <router-link v-for="g in developerGames" :key="g.id" :to="`/game/${g.id}`">
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
import { getDeveloperGames, getDeveloperData } from '@/api'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const developerGameData = ref<DeveloperGame | null>(null)
const developerData = ref<DeveloperData | null>(null)
const developerGames = ref<Game[] | []>([])
const page = ref<number>(1)
let id = route.params.id as string

function scroll() {
  window.onscroll = () => {
    const bottomOfWindow = (window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight
    console.log(window.innerHeight, window.scrollY, document.body.offsetHeight)
    if (bottomOfWindow && developerGameData.value?.next !== null) {
      fetchDeveloperGames()
      page.value++
    }
  }
}

async function fetchDeveloperData() {
  const response = await getDeveloperData(id)
  if (response !== null) {
    developerData.value = response
    id = response.id.toString()
  }
}

async function fetchDeveloperGames() {
  const response = await getDeveloperGames(id, page.value)
  if (response !== null) {
    developerGameData.value = response
    developerGames.value = [...developerGames.value, ...response.results]
  }
}

onMounted(() => {
  fetchDeveloperData()
  fetchDeveloperGames()
  scroll()
})
</script>
