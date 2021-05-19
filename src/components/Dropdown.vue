<script setup lang='ts'>
import { defineEmit, defineProps } from 'vue'
import type { PropType } from 'vue'
import { useVModel } from '@vueuse/core'

type Option = {
  key: string
  text: string
}

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  options: {
    type: Array as PropType<Option[]>,
    default: [],
  },
})

const emit = defineEmit(['update:modelValue'])

const value = useVModel(props, 'modelValue', emit)
</script>

<template>
  <select v-model="value" name="dropdown" class="px-4 pb-1.5 pt-1 rounded bg-blue-gray-100 dark:bg-true-gray-900 disabled:cursor-default">
    <template v-for="(o, i) of options" :key="o.key">
      <template v-if="i == 1">
        <option :selected="true" :value="o.key">
          {{ o.text }}
        </option>
      </template>
      <template v-else>
        <option :value="o.key">
          {{ o.text }}
        </option>
      </template>
    </template>
  </select>
</template>
