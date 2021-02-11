import { watch, computed, Ref } from 'vue'
import { usePreferredDark, useStorage } from '@vueuse/core'

const preferredDark = usePreferredDark()

export const colorSchema = useStorage('color-schema', 'auto') as Ref<'auto' | 'dark' | 'light'>

export const isDark = computed({
  get() {
    return colorSchema.value === 'auto' ? preferredDark.value : colorSchema.value === 'dark'
  },
  set(v: boolean) {
    if (v === preferredDark.value)
      colorSchema.value = 'auto'
    else
      colorSchema.value = v ? 'dark' : 'light'
  },
})

watch(
  isDark,
  v => typeof document !== 'undefined' && document.documentElement.classList.toggle('dark', v),
  { immediate: true },
)
