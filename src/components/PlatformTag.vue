<template>
  <div
    class="px-2 py-1 bg-purple-500 text-gray-200 text-center rounded"
    :class="{'bg-green-600': name === 'Xbox',
             'bg-red-600': name === 'Nintendo',
             'bg-blue-600': name === 'PlayStation',
             'bg-blue-gray-800': name === 'PC'}"
  >
    {{ name }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

</script>
