<script setup lang="ts">
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'

const props = defineProps({
  name: {
    type: String,
    require: true,
  },
})

const router = useRouter()
</script>

<template>
  <div>
    <p class="text-4xl">
      <carbon-pedestrian class="inline-block" />
    </p>
    <p>
      hi {{ props.name }}
    </p>
    <p class="text-sm opacity-50">
      <em>dynamic route</em>
    </p>

    <div>
      <button
        class="m-3 mt-8 text-sm btn"
        @click="router.back()"
      >
        back
      </button>
    </div>
  </div>
</template>
