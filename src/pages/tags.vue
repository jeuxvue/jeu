<template>
  <div v-if="data === null || data === null">
    loading
  </div>
  <div v-else class="flex flex-col max-w-screen-lg m-auto xl:max-w-screen-xl">
    <YoBox class="flex items-end w-full gap-4 mt-8">
      <InputWrap class="flex-grow" title="Search for a tag">
        <InputText v-model="searchQuery" class="w-full" @keydown.enter="handleSearch" />
      </InputWrap>
      <button class="btn btn-primary" @click="handleSearch">
        Search
      </button>
    </YoBox>
  </div>
  <div class="flex justify-center w-full mt-10">
    <div class="flex flex-row w-full max-w-screen-lg gap-12 xl:max-w-screen-xl">
      <CreatorsGallery :creators="creators" :creator-data="data" creator-type="tag" @fetch-next="fetchNext" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CategoryCreators, Creators } from '@/api/types'
import { getTags } from '@/api/creators'
import { onMounted, ref } from 'vue'

const data = ref<CategoryCreators | null>(null)
const creators = ref<Creators[] | null>(null)

const searchQuery = ref<String>('')

const currentSearchParams = ref({
  search: '',
  page: 1,
  page_size: 20,
})

onMounted(async() => {
  data.value = await getTags(currentSearchParams.value)
  console.log(data.value)
  creators.value = data.value.results
  console.log(creators.value)
})

async function handleSearch() {
  currentSearchParams.value = {
    search: searchQuery.value as string,
    page: 1,
    page_size: 20,
  }
  data.value = await getTags(currentSearchParams.value)
  creators.value = data.value.results
}

async function fetchNext() {
  currentSearchParams.value.page++
  data.value = await getTags(currentSearchParams.value)
  creators.value = [...creators.value, ...data.value.results]
}

</script>
