<template>
  <div class="yo-tag" :class="classObject">
    <slot />
  </div>
</template>

<script>

export default {
  name: 'YoTag',
  props: {
    type: {
      type: String,
      default: 'primary',
    },
    closeable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classObject() {
      return {
        [`is-${this.type}`]: this.type,
      }
    },
  },
}
</script>

<style  lang='scss'>
@import '@/theme/fonts';

.yo-tag {
  padding: $tag-padding-y $tag-padding-x;
  color: $text-white;
  border-radius: $tag-border-radius;
  @include font-16;
}

.is-primary {
  background: $primary;
}

.is-danger {
  background: $danger;
}

.is-success {
  background: $success;
}

.is-love {
  background: $love;
}

.is-warning {
  background: $warning;
  color: $text-black;
}

.is-orange {
  background: $tag-orange;
}

.is-peach {
  background: $tag-peach;
}

.is-turquoise {
  background: $tag-turquoise;
}

</style>
