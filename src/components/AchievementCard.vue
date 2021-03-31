//TODO: Additional data on hover
<template>
  <div class="flex flex-col w-25">
    <div>
      <img class="object-cover object-center w-full rounded h-25 mb-1" :src="image" alt="">
      {{ name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
})
</script>
