<template>
  <div class='yo-checkbox'>
    <input
      v-model='content'
      class='yo-checkbox__checkbox'
      type='checkbox'
    >
    <YoIcon v-if='checked' class='yo-checkbox__icon' name='checkmark-square' />
    <YoIcon v-else class='yo-checkbox__icon' name='square' />
  </div>
</template>

<script>
import YoIcon from '../YoIcon/YoIcon.vue'

export default {
  name: 'YoCheckbox',
  components: {
    YoIcon,
  },
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: Boolean,
  },
  computed: {
    content: {
      get() {
        return this.checked
      },
      set(value) {
        this.$emit('change', value)
      },
    },
  },
}
</script>

<style lang='scss'>
.yo-checkbox {
  display: inline-block;
  position: relative;
  vertical-align: top;
  &__checkbox {
    opacity: 0;
    width: 24px;
    height: 24px;
    margin: 0;
  }
  &__icon {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
  }
}
</style>
