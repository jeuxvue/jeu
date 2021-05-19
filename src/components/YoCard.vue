<template>
  <YoBox class="flex p-0 overflow-hidden">
    <a>
      <img class="object-cover w-20 h-20" :src="data.image" alt="">
    </a>
    <div class="flex flex-col justify-between p-2">
      <a class="link">
        {{ data.name }}
      </a>
    </div>
  </Yobox>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'

type CardData = {
  name: string
  image: string
}

const props = defineProps({
  data: {
    type: Object as PropType<CardData>,
    required: true,
  },
})
</script>
