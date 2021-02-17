<script setup lang='ts'>
import { ref, defineEmit, defineProps, watch } from 'vue'

const props = defineProps({
  liked: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmit(['update'])

function handleClick() {
  isLiked.value = !isLiked.value
  emit('update', isLiked.value)
}

const isLiked = ref(props.liked)
watch(() => props.liked, liked => isLiked.value = liked)
</script>

<template>
  <button
    class="w-9 h-9 p-1.5 rounded text-rose-300 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-400 disabled:text-rose-100 disabled:cursor-default focus:outline-none focus-visible:ring ring-rose-300"
    :disabled="disabled"
    @click="handleClick"
  >
    <i-jam-heart-f
      v-if="isLiked"
      class="w-6 h-6 fill-current"
    />
    <i-jam-heart
      v-else
      class="w-6 h-6 fill-current"
    />
  </button>
</template>
