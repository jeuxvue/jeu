<template>
  <div>
    <div v-if="!isTextShown">
      <div class="flex flex-col gap-4 mt-4" v-html="text.slice(0, limit).split(' ').slice(0, -1).join(' ') + '...'" />
      <div class="mt-2 text-center">
        <a class="font-semibold link" @click="isReadMoreActivated = true">Read more...</a>
      </div>
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
    default: 400,
  },
})

const isTextShown = computed(() => {
  return isReadMoreActivated.value || props.text.length < props.limit
})

const isReadMoreActivated = ref(false)
</script>
