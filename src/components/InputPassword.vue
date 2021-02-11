<script setup lang='ts'>
import { computed, defineEmit, defineProps, ref } from 'vue'

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

const isVisible = ref(false)

function toggleVisibility() {
  isVisible.value = !isVisible.value
}
</script>

<template>
  <div class="relative inline-block">
    <InputText
      v-model="value"
      :type="isVisible ? 'text' : 'password'"
      :placeholder="placeholder"
    />
    <button class="absolute right-0 h-full px-2 rounded " @click="toggleVisibility">
      <i-carbon-view v-if="isVisible" />
      <i-carbon-view-off v-else />
    </button>
  </div>
</template>
