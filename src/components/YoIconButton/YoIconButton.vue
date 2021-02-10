<template>
  <YoButton class='yo-icon-button' type='empty' @click='handleClick'>
    <YoIcon class='yo-icon-button__icon' :name='name' />
  </YoButton>
</template>

<script>
import YoIcon from '../YoIcon/YoIcon.vue'
import YoButton from '../YoButton/YoButton.vue'

export default {
  name: 'YoIconButton',
  components: {
    YoIcon,
    YoButton,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    },
  },
}
</script>

<style scoped lang='scss'>
.yo-icon-button {
  font-size: 0;
  padding: 0;
}
</style>
