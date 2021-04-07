<template>
  <div v-if="achievements?.length === 0">
    No achievements
  </div>
  <div v-else class="flex gap-4 flex-wrap w-full">
    <YoSection>
      <div class="flex gap-4 flex-wrap">
        <AchievementCard v-for="a in achievements" :key="a.id" :name="a.name" :image="a.image" />
      </div>
    </YoSection>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Achievement, AchievementData } from '@/api/types'
import { getGameAchievements } from '@/api/index'

const route = useRoute()
const id = route.params.id

const achievements = ref<Achievement[] | null>([])
const achievementData = ref<AchievementData | null>(null)

let page = 1

function scroll() {
  window.onscroll = () => {
    const bottomOfWindow = (window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight
    if (bottomOfWindow && achievementData.value?.next !== null) {
      fetchGameAchievements()
      page++
    }
  }
}

async function fetchGameAchievements() {
  const response = await getGameAchievements(id as string, page)
  if (response !== null) {
    achievementData.value = response
    achievements.value = [...achievements.value, ...response.results]
  }
}

onMounted(async() => {
  await fetchGameAchievements()
  page++
  while (achievementData.value?.next !== null && page !== 4) {
    await fetchGameAchievements()
    page++
  }
  scroll()
})

</script>
