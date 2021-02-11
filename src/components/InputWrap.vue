<script setup lang='ts'>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <label>
    <div class="mb-1.5 text-sm text-gray-400">{{ title }}</div>
    <slot />
  </label>
</template>
