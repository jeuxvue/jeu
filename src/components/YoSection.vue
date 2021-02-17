<script setup lang='ts'>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section v-bind="$attrs" class="flex flex-col gap-2">
    <h2 v-if="title" class="ml-1 text-base font-semibold tracking-wide">
      {{ title }}
    </h2>
    <slot />
  </section>
</template>
