<template>
  <div>
    <div v-if="!isTextShown">
      <div class="flex flex-col gap-4 mt-4" v-html="text.slice(0, limit)" />
      <a class="link" @click="isReadMoreActivated = true">Read more...</a>
    </div>
    <div v-if="isTextShown" class="flex flex-col gap-4 mt-4" v-html="text" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from 'vue'
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    default: 1000,
  },
})

const isTextShown = computed(() => {
  return isReadMoreActivated.value || props.text.length < props.limit
})

const isReadMoreActivated = ref(false)
</script>
