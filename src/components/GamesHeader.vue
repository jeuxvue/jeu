<template>
  <div class="w-full bg-white dark:bg-gray-800 h-30" />
  <div class="flex flex-col items-center w-full pt-6">
    <div class="flex flex-row w-full max-w-screen-lg gap-12 px-12 xl:max-w-screen-xl">
      <div class="flex flex-col flex-shrink-0 gap-4 -mt-30 w-54">
        <img class="object-cover object-center w-full rounded h-82" :src="headerData?.image_background" alt="">
      </div>
      <div class="w-full">
        <div>
          <div class="flex w-full -mt-28">
            <div class="text-3xl">
              {{ headerData?.name }}
            </div>
            <LikeButton class="ml-auto" />
          </div>
          <DescriptionText v-if="headerData?.description" class="mt-20" :text="headerData?.description" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { CategoryData } from '@/api/types'

const props = defineProps({
  headerData: {
    type: Object as PropType<CategoryData | null>,
    default: null,
  },
})

</script>
