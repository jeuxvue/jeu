<script setup lang='ts'>
import { defineEmit, defineProps } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
})

const emit = defineEmit(['update:modelValue'])

const value = useVModel(props, 'modelValue', emit)
</script>

<template>
  <input
    v-model="value"
    class="px-4 pb-1.5 pt-1 rounded bg-blueGray-100 dark:bg-trueGray-900 disabled:cursor-default"
    :type="type"
    :placeholder="placeholder"
  >
</template>
