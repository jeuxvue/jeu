<script setup lang="ts">
import { useHead } from '@vueuse/head'

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be renedered correctly in the html results with vite-ssg
useHead({
  title: 'jeu',
  meta: [
    { name: 'description', content: 'game list' },
  ],
})
</script>

<template>
  <main class="text-gray-700 dark:text-gray-200">
    <RouterView />
    <YoFooter />
  </main>
</template>
