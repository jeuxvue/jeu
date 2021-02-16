<template>
  <div class="flex text-base tracking-wide bg-white rounded shadow-sm dark:bg-gray-800">
    <a :href="data.link">
      <img class="w-25 h-25 rounded-l-lg object-cover" :src="data.image" alt="">
    </a>
    <div class="flex flex-col justify-between p-2">
      <a class="hover:underline" :href="data.link">
        {{ data.name }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'

type CardData = {
  name: string
  image: string
  link: string
}

const props = defineProps({
  data: {
    type: Object as PropType<CardData>,
    required: true,
  },
})
</script>
