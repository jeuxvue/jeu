<template>
  <div class="flex flex-col items-center">
    <div class="bg-white dark:bg-gray-800 w-full h-30" />
    <div class="flex flex-col items-center w-full pt-6">
      <div class="flex flex-row w-full max-w-screen-lg gap-12 px-12 xl:max-w-screen-xl">
        <div class=" flex flex-col flex-shrink-0 gap-4 -mt-30 w-54">
          <img class="object-cover object-center w-full rounded h-72" src="https://media.rawg.io/media/games/998/9980c4296f311d8bcc5b451ca51e4fe1.jpg" alt="">
        </div>
        <div>
          <div>
            <div class="flex -mt-28">
              <h1 class="text-3xl">
                Electronic arts
              </h1>
              <LikeButton class="ml-auto" />
            </div>
            <div class="mt-20">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non quod expedita, ex recusandae totam magnam eos quaerat quos tenetur ut! Rerum sunt blanditiis eaque possimus saepe, velit natus earum ducimus?
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center w-full mt-10">
      <div class="flex flex-row w-full max-w-screen-lg gap-12 xl:max-w-screen-xl">
        <YoSection v-if="developerGameData?.results.length !== 0" class="w-full" title="Developer's games">
          <div class="flex gap-8 w-full flex-wrap">
            <GameCard v-for="g in developerGameData?.results" :key="g.id" :name="g.name" :image="g.background_image" />
          </div>
        </YoSection>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DeveloperGame } from '@/api/types'
import { getDeveloperGames } from '@/api'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const developerGameData = ref<DeveloperGame | null>(null)

async function fetchDeveloperGames() {
  const id = route.params.id as string
  const response = await getDeveloperGames(id)

  if (response !== null)
    developerGameData.value = response

  console.log(response.results)
}

onMounted(fetchDeveloperGames)
</script>
