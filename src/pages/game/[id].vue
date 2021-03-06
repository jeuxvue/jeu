<script setup lang="ts">
import { getGame, addToList, removeFromList, useUser, useList } from '@/api'
import type { GameResponse } from '@/api/types'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const gameId = route.params.id as string

const game = ref<GameResponse | null>(null)

async function fetchGame() {
  const response = await getGame(gameId)

  if (response === null || 'detail' in response) return

  if ('id' in response)
    game.value = response

  if ('redirect' in response)
    router.push({ params: { id: response.slug } })
}

onMounted(fetchGame)
watch(route, fetchGame)

const list = useList()

const isAdded = computed(() => {
  if (!list.value) return false
  return !!list.value.find(el => String(el.game_id) === gameId)
})

watchEffect(() => {
  console.log(list.value, list.value?.find(el => el.game_id == gameId))
  console.log(isAdded.value)
})

const user = useUser()

function handleAddToList() {
  if (user.value) {
    addToList({
      userId: user.value?.id,
      gameId: Number(gameId),
      gameCover: game.value?.background_image,
      gameName: game.value?.name,
    })
  }
}

function handleRemoveFromList() {
  console.log(user.value?.id, Number(gameId))
  if (user.value)
    removeFromList(user.value?.id, Number(gameId))
}
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
            <template v-if="user">
              <template v-if="isAdded">
                <button class="flex-grow btn btn-primary" @click="handleRemoveFromList">
                  Remove from List
                </button>
              </template>
              <template v-else>
                <button class="flex-grow btn btn-primary" @click="handleAddToList">
                  Add to List
                </button>
              </template>
              <LikeButton />
            </template>
          </div>
        </div>
        <div class="">
          <div>
            <h2 class="text-xl">
              {{ game.name }}
            </h2>
            <DescriptionText :text="game.description" />
          </div>
          <nav class="flex justify-around w-full mt-8 text-sm">
            <router-link :to="`/game/${route.params.id}/`" class="p-3 link">
              Overview
            </router-link>
            <router-link :to="`/game/${route.params.id}/achievements`" class="p-3 link">
              Achievements
            </router-link>
            <router-link :to="`/game/${route.params.id}/additions`" class="p-3 link">
              Additions
            </router-link>
            <router-link :to="`/game/${route.params.id}/series`" class="p-3 link">
              Game series
            </router-link>
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
            <template v-for="t in game.tags" :key="t.id">
              <YoBox class="p-1.25 text-center">
                <router-link class="link" :to="`/tag/${t.id}`">
                  {{ t.name }}
                </router-link>
              </YoBox>
            </template>
          </YoSection>
        </div>
        <RouterView :route-data="game" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-item {
  @apply link;
}
</style>
