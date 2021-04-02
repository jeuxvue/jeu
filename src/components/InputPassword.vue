<script setup lang='ts'>
import { useVModel } from '@vueuse/core'
import { ref, defineEmit, defineProps } from 'vue'

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

const isVisible = ref(false)
</script>

<template>
  <div class="relative inline-block">
    <InputText
      v-model="value"
      class="w-full"
      v-bind="$attrs"
      :type="isVisible ? 'text' : 'password'"
      :placeholder="placeholder"
    />
    <button type="button" class="absolute right-0 h-full px-2 rounded " @click="isVisible = !isVisible">
      <i-carbon-view v-if="isVisible" />
      <i-carbon-view-off v-else />
    </button>
  </div>
</template>
