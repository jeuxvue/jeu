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
})

const emit = defineEmit(['update:modelValue'])

const value = useVModel(props, 'modelValue', emit)
</script>

<template>
  <YoInput
    v-model="value"
    type="text"
    :placeholder="placeholder"
  />
</template>
