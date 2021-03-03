<template>
  <div class="flex flex-col w-46 relative">
    <a class="link">
      <img class="object-cover object-center w-full rounded h-72 mb-1" :src="image" alt="">
      {{ name }}
    </a>
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
