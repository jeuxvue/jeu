<script setup lang="ts">
import { isDark } from '@/logics'
</script>

<template>
  <nav class="mt-6 text-xl">
    <a class="mx-2 icon-btn" title="toggle dark" @click="isDark = !isDark">
      <i-carbon-moon v-if="isDark" />
      <i-carbon-sun v-else />
    </a>
  </nav>
</template>
