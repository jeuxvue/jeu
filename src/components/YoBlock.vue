<template inherit-attrs="false">
  <div class="flex flex-col gap-1">
    <h2 v-if="title" class="ml-2 text-base font-semibold tracking-wide">
      {{ title }}
    </h2>
    <div
      class="p-4 text-base tracking-wide bg-white rounded shadow-sm dark:bg-gray-800"
      :class="contentClass"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: '',
  },
  contentClass: {
    type: String,
    default: '',
  },
})
</script>
