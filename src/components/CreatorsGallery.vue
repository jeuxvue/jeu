<template>
  <YoSection v-if="creators?.length !== 0" :title="title" class="w-full">
    <div class="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4 justify-center w-full">
      <router-link v-for="c in creators" :key="c.id" class="flex justify-center" :to="`/${creatorType}/${c.id}`">
        <GameCard :name="c.name" :image="c.image_background" />
      </router-link>
    </div>
  </YoSection>
</template>

<script setup lang="ts">
import type { CategoryCreators, Creators } from '@/api/types'
import { defineProps, ref, watch, defineEmit } from 'vue'
import type { PropType } from 'vue'
import { useWindowScroll } from '@vueuse/core'

const props = defineProps({
  creatorData: {
    type: Object as PropType<CategoryCreators | null>,
    default: null,
  },
  creators: {
    type: Object as PropType<Creators[] | null>,
    default: null,
  },
  title: {
    type: String,
    default: '',
  },
  creatorType: {
    type: String,
    required: true,
  },
})

const creatorInfo = ref<CategoryCreators | null>(null)

watch(() => props.creatorData, creatorData => creatorInfo.value = creatorData)

const emit = defineEmit(['fetch-next'])

const { y } = useWindowScroll()

watch(y, () => {
  const bottomOfWindow = (window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight
  if (bottomOfWindow && creatorInfo.value?.next !== null)
    emit('fetch-next')
})
</script>
