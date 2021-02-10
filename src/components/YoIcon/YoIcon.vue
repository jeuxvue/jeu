<template>
  <component
    :is='iconComponent'
    class='yo-icon'
  />
</template>

<script>
const icons = {
  eye: () => import('./icons/EyeIcon.vue'),
  'eye-off': () => import('./icons/EyeOffIcon.vue'),
  close: () => import('./icons/CloseIcon.vue'),
  'checkmark-square': () => import('./icons/CheckmarkSquareIcon.vue'),
  square: () => import('./icons/SquareIcon.vue'),
}

export default {
  name: 'YoIcon',
  props: {
    name: {
      type: String,
      required: true,
      validator: value => Object.keys(icons).includes(value),
    },
  },
  computed: {
    iconComponent() {
      return icons[this.name]
    },
  },
}
</script>

<style scoped lang='scss'>
.yo-icon {
  width: 24px;
  height: 24px;
  fill: $text-primary;
}
</style>
