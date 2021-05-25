<script setup lang="ts">
import { isDark } from '@/logics'
import { useUser, signInGithub, signOut } from '@/api'

const user = useUser()
</script>

<template>
  <YoBox class="w-full flex justify-center ">
    <nav class="max-w-screen-lg w-full text-xl flex flex-row gap-8 justify-between my-6 ">
      <div class="flex flex-col gap-4">
        <div><b class="link hover:(transform scale-125) transition">Jeu</b> is platform to aggregate games</div>
        <div class="text-lg">
          © 2021-2021 Jeu. All Rights Reserved.
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div>Be healthy.</div>
        <div> Play games.</div>
      </div>
      <div class="flex flex-row gap-8">
        <a class="mx-2 icon-btn" title="toggle dark" @click="isDark = !isDark">
          <i-carbon-moon v-if="isDark" />
          <i-carbon-sun v-else />
        </a>
      </div>
    </nav>
  </YoBox>
</template>
