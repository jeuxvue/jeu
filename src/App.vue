<script setup lang="ts">
import { useHead } from '@vueuse/head'
// import { YoButton } from '@moeta/yo'

// console.log(yo)

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be renedered correctly in the html results with vite-ssg
useHead({
  title: 'Vitesse',
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template' },
  ],
})
</script>

<template>
  <main class="px-4 py-10 text-gray-700 dark:text-gray-200">
    <router-view />
    <YoFooter />
  </main>
</template>

<style>
html {
  @apply bg-blueGray-100;
}
html.dark {
  @apply bg-trueGray-900;
}
</style>
