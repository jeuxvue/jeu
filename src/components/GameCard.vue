<template>
  <div class="relative flex flex-col w-46">
    <a class="link">
      <template v-if="image">
        <img class="object-cover object-center w-full mb-1 rounded h-72" :src="image" alt="">
      </template>
      <template v-else>
        <YoBox class="flex items-center justify-center w-full mb-1 rounded h-72"><div class="rotation">（｀Δ´）！</div></YoBox>
      </template>

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
  },
})
</script>

<style>
.rotation {
  animation: rotation 100s linear infinite;
}

@keyframes rotation {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
