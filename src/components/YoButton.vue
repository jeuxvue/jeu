<template>
  <button
    class="px-4 pb-1.5 pt-1 rounded border border-transparent focus:outline-none focus-visible:ring disabled:cursor-default"
    :class="{
      'text-white bg-violet-500 hover:bg-violet-600 disabled:bg-violet-300 ring-violet-300': type === 'primary',
      'text-black disabled:text-warmGray-600 bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-200 ring-yellow-200 ': type === 'warning',
      'text-white bg-red-500 hover:bg-red-600 disabled:bg-red-300 ring-red-300 ': type === 'danger',
      'text-white bg-green-500 hover:bg-green-600 disabled:bg-green-300 ring-green-300 ': type === 'success',
    }"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang='ts'>
import { defineEmit, defineProps } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  type: {
    type: String as PropType<'primary' | 'warning' | 'danger' | 'success'>,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmit(['click'])

function handleClick(e: Event) {
  emit('click', e)
}
</script>
