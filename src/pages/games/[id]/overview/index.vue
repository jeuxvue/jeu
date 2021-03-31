<template>
  <div>{{ route.params }}</div>
  <!-- <div
    class="flex flex-col w-full gap-8"
  >
    <YoSection v-if="game.developers" title="Developers">
      <div class="grid w-full grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2 xl:grid-cols-3">
        <router-link v-for="d of game.developers" :key="d.id" :to="`/developers/${d.id}`">
          <YoCard :data="{ name: d.name, image: d.image_background }" />
        </router-link>
      </div>
    </YoSection>
    <YoSection v-if="game.publishers" title="Publishers">
      <div class="grid w-full grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2 xl:grid-cols-3">
        <template v-for="p of game.publishers" :key="p.id">
          <router-link :to="`/publishers/${p.id}`">
            <YoCard :data="{ name: p.name, image: p.image_background }" />
          </router-link>
        </template>
      </div>
    </YoSection>
    <YoSection v-if="game.stores" title="Game stores">
      <div class="grid w-full grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2 xl:grid-cols-3">
        <YoCard v-for="s of game.stores" :key="s.id" :data="{ name: s.store.name, image: s.store.image_background }" />
      </div>
    </YoSection>
    <YoSection v-if="game.genres" title="Game genres">
      <div class="grid w-full grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2 xl:grid-cols-3">
        <template v-for="g of game.genres" :key="g.id">
          <router-link :to="`/genres/${g.id}`">
            <YoCard :data="{ name: g.name, image: g.image_background }" />
          </router-link>
        </template>
      </div>
    </YoSection>
  </div> -->
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const props = defineProps({
  routeData: {
    type: Object,
    required: true,
  },
})

</script>
