<script setup lang='ts'>
import { getGame } from '@/api'
import type { GameResponse } from '@/api/types'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const game = ref<GameResponse | null>(null)

async function fetchGame() {
  const id = route.params.id as string
  const response = await getGame(id)

  if (response === null || 'detail' in response) return

  if ('id' in response)
    game.value = response

  if ('redirect' in response)
    router.push({ params: { id: response.slug } })
}

onMounted(fetchGame)
watch(route, fetchGame)
</script>

<template>
  <div v-if="game == null">
    loading
  </div>
  <div v-else-if="'id' in game" class="flex flex-col items-center">
    <img class="object-cover w-full bg-center h-80" :src="game.background_image_additional" alt="">
    <div class="flex flex-col items-center w-full pt-6 bg-white dark:bg-gray-800">
      <div class="flex flex-row w-full max-w-screen-lg gap-12 px-12 xl:max-w-screen-xl">
        <div class="flex flex-col flex-shrink-0 gap-4 -mt-40 w-54">
          <img class="object-cover object-center w-full rounded h-72" :src="game.background_image" alt="">
          <div class="flex w-full gap-4">
            <button class="flex-grow btn btn-primary">
              Add to List
            </button>
            <LikeButton />
          </div>
        </div>
        <div class="">
          <div>
            <h2 class="text-xl">
              {{ game.name }}
            </h2>
            <DescriptionText :text="game.description" limit="640" />
            <!-- <div class="flex flex-col gap-4 mt-4" v-html="game.description" /> -->
          </div>
          <nav class="flex justify-around w-full mt-8 text-sm">
            <button class="p-3 link">
              Overview
            </button>
            <button class="p-3 link">
              Watch
            </button>
            <button class="p-3 link">
              Characters
            </button>
            <button class="p-3 link">
              Staff
            </button>
            <button class="p-3 link">
              Stats
            </button>
            <button class="p-3 link">
              Social
            </button>
          </nav>
        </div>
      </div>
    </div>
    <div class="flex justify-center w-full mt-10">
      <div class="flex flex-row w-full max-w-screen-lg gap-12 px-12 xl:max-w-screen-xl">
        <div class="flex flex-col flex-shrink-0 gap-4 w-54">
          <YoBox class="flex items-center gap-2 px-4 py-2">
            <i-carbon-star-filled class="w-4 h-4 text-yellow-500" />{{ game.metacritic }} Metascore
          </YoBox>
          <YoBox class="flex items-center gap-2 px-4 py-2">
            <i-mdi-cards-heart class="w-4 h-4 text-rose-500" />{{ game.added }} People liked
          </YoBox>
          <YoBox class="flex flex-col items-start gap-4">
            <div>
              <div>
                Playtime
              </div>
              <div
                class="text-gray-500 dark:text-gray-400"
              >
                {{ game.playtime }} hours
              </div>
            </div>
            <div>
              <div>
                Released
              </div>
              <div
                class="text-gray-500 dark:text-gray-400"
              >
                {{ game.released }}
              </div>
            </div>
            <div>
              <div>
                Achievments
              </div>
              <div
                class="text-gray-500 dark:text-gray-400"
              >
                {{ game.achievements_count }}
              </div>
            </div>
            <div v-if="game?.esrb_rating">
              <div>
                ESRB Rating
              </div>
              <div
                class="text-gray-500 dark:text-gray-400"
              >
                {{ game.esrb_rating.name }}
              </div>
            </div>
          </YoBox>
          <YoSection title="Platforms">
            <PlatformTag v-for="p of game.parent_platforms" :key="p.platform.id" :name="p.platform.name" />
          </YoSection>
          <YoSection title="Tags">
            <YoBox v-for="t in game.tags" :key="t.id" class="p-1.25 text-center">
              {{ t.name }}
            </YoBox>
          </YoSection>
        </div>
        <div
          class="flex flex-col w-full gap-8"
        >
          <YoSection v-if="game.developers" title="Developers">
            <div class="grid w-full grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2 xl:grid-cols-3">
              <YoCard v-for="d of game.developers" :key="d.id" :data="{ name: d.name, image: d.image_background }" />
            </div>
          </YoSection>
          <YoSection v-if="game.publishers" title="Publishers">
            <div class="grid w-full grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2 xl:grid-cols-3">
              <YoCard v-for="p of game.publishers" :key="p.id" :data="{ name: p.name, image: p.image_background }" />
            </div>
          </YoSection>
          <YoSection v-if="game.stores" title="Game stores">
            <div class="grid w-full grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2 xl:grid-cols-3">
              <YoCard v-for="s of game.stores" :key="s.id" :data="{ name: s.store.name, image: s.store.image_background }" />
            </div>
          </YoSection>
          <YoSection v-if="game.genres" title="Game genres">
            <div class="grid w-full grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2 xl:grid-cols-3">
              <YoCard v-for="g of game.genres" :key="g.id" :data="{ name: g.name, image: g.image_background }" />
            </div>
          </YoSection>
          <!-- <YoSection title="Characters">
            <div class="grid grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2 xl:grid-cols-3">
              <YoBox class="flex h-24 gap-3 p-0 overflow-hidden text-sm">
                <img class="object-cover w-18" src="https://s4.anilist.co/file/anilistcdn/character/large/b126635-L0y3I92JSUkN.png">
                <div class="flex flex-col gap-0.5 py-2">
                  <div>Megumi Fushigoro</div>
                  <div class="mt-auto text-gray-500 dark:text-gray-400">
                    Main
                  </div>
                </div>
                <div class="ml-auto flex flex-col items-end gap-0.5 py-2">
                  <div class="text-right">
                    Yuuma Uchida
                  </div>
                  <div class="mt-auto text-sm text-gray-500 dark:text-gray-400">
                    Japanese
                  </div>
                </div>
                <img class="object-cover w-18" src="https://s4.anilist.co/file/anilistcdn/staff/large/n119617-JrszQbQjwLCD.png">
              </YoBox>
              <YoBox class="flex h-24 gap-3 p-0 overflow-hidden text-sm">
                <img class="object-cover w-18" src="https://s4.anilist.co/file/anilistcdn/character/large/b126635-L0y3I92JSUkN.png">
                <div class="flex flex-col gap-0.5 py-2">
                  <div>Megumi Fushigoro</div>
                  <div class="mt-auto text-sm text-gray-500 dark:text-gray-400">
                    Main
                  </div>
                </div>
                <div class="ml-auto flex flex-col items-end gap-0.5 py-2">
                  <div class="text-right">
                    Yuuma Uchida
                  </div>
                  <div class="mt-auto text-sm text-gray-500 dark:text-gray-400">
                    Japanese
                  </div>
                </div>
                <img class="object-cover w-18" src="https://s4.anilist.co/file/anilistcdn/staff/large/n119617-JrszQbQjwLCD.png">
              </YoBox>
              <YoBox class="flex h-24 gap-3 p-0 overflow-hidden text-sm">
                <img class="object-cover w-18" src="https://s4.anilist.co/file/anilistcdn/character/large/b126635-L0y3I92JSUkN.png">
                <div class="flex flex-col gap-0.5 py-2">
                  <div>Megumi Fushigoro</div>
                  <div class="mt-auto text-sm text-gray-500 dark:text-gray-400">
                    Main
                  </div>
                </div>
                <div class="ml-auto flex flex-col items-end gap-0.5 py-2">
                  <div class="text-right">
                    Yuuma Uchida
                  </div>
                  <div class="mt-auto text-sm text-gray-500 dark:text-gray-400">
                    Japanese
                  </div>
                </div>
                <img class="object-cover w-18" src="https://s4.anilist.co/file/anilistcdn/staff/large/n119617-JrszQbQjwLCD.png">
              </YoBox>
            </div>
          </YoSection> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-item {
  @apply link;
}
</style>
