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
    :placeholder="placeholder"
    type="number"
  />
</template>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
