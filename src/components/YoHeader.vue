<script setup lang="ts">
import { isDark } from '@/logics'
import { useUser, signInGithub, signOut } from '@/api'
import { computed } from 'vue'

const user = useUser()
const userUrl = computed(() => {
  return `/user/${user.value?.id}`
})
</script>

<template>
  <YoBox class="w-full flex justify-center">
    <nav class="max-w-screen-lg w-full text-xl flex flex-row gap-8 justify-between my-2">
      <RouterLink to="/games" class="font-medium tracking-widest uppercase link hover:(transform scale-125) transition">
        Jeu
      </RouterLink>
      <div class="flex flex-row gap-8">
        <RouterLink class="link" to="/games">
          Home
        </RouterLink>
        <RouterLink class="link" to="/games">
          Games
        </RouterLink>
        <RouterLink class="link" to="/publishers">
          Publishers
        </RouterLink>
        <RouterLink class="link" to="/developers">
          Developers
        </RouterLink>
      </div>
      <div class="flex flex-row gap-8 items-center">
        <template v-if="user">
          <RouterLink class="link flex flex-row gap-2" :to="userUrl">
            <img class="w-8 h-8 rounded-full" :src="user.user_metadata.avatar_url" :alt="user.user_metadata.full_name">
            <div>
              {{ user.user_metadata.full_name }}
            </div>
          </RouterLink>
          <button class="link flex flex-row gap-2" @click="signOut">
            <i-carbon:login />
          </button>
        </template>
        <template v-else>
          <button class="link flex flex-row gap-2" @click="signInGithub">
            Sign in
          </button>
        </template>
      </div>
    </nav>
  </yobox>
</template>
