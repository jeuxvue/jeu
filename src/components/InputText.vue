<script setup lang='ts'>
import { computed, defineEmit, defineProps } from 'vue'

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

const value = computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <YoInput
    v-model="value"
    type="text"
    :placeholder="placeholder"
  />
</template>
