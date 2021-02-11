<template>
  <div class='yo-input'>
    <input
      v-model='computedValue'
      class='yo-input__inner'
      :class='classObject'
      :type='innerType'
      :placeholder='placeholder'
    >
    <YoIconButton
      v-if='isPassword'
      class='yo-input__toggle'
      :name='toggleIcon'
      @click='toggle'
    />
  </div>
</template>

<script>
import YoIconButton from '../YoIconButton/YoIconButton.vue'

export default {
  name: 'YoInput',
  components: {
    YoIconButton,
  },
  props: {
    value: {
      type: [ Number, String ],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
      validator: value => [
        'text',
        'number',
        'password',
      ].includes(value),
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      innerType: this.type,
    }
  },
  computed: {
    isPassword() {
      return this.type === 'password'
    },
    toggleIcon() {
      return this.type !== this.innerType ? 'eye' : 'eye-off'
    },
    computedValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    classObject() {
      return {
        'is-password': this.type === 'password',
      }
    },
  },
  methods: {
    toggle() {
      if (this.type === this.innerType) {
        this.innerType = 'text'
      } else {
        this.innerType = 'password'
      }
    },
  },
}
</script>

// <style lang='scss'>
// @import '@/theme/mixins';
// @import '@/theme/fonts';

// .yo-input {
//   position: relative;
//   background: $background;
//   padding: 0 $input-padding;
//   border-radius: $input-border-radius;
//   display: inline-grid;
//   grid-auto-flow: column;
//   grid-template-columns: 1fr;
//   column-gap: $input-padding;
//   align-items: center;

//   &:focus-within {
//     @include default-focus;
//   }

//   &__inner {
//     // reset
//     margin: 0;
//     border: 0;
//     padding: 0;
//     display: inline-block;
//     vertical-align: middle;
//     white-space: normal;
//     background: none;
//     color: inherit;
//     font-family: inherit;
//     @include font-16;

//     padding: $input-padding 0;

//     &::placeholder {
//       color: $text-secondary;
//     }

//     &:focus {
//       outline: 0;
//     }

//     // removes arrows on type=number
//     -moz-appearance: textfield;
//     &::-webkit-outer-spin-button,
//     &::-webkit-inner-spin-button {
//       -webkit-appearance: none;
//       margin: 0;
//     }
//   }

//   &__toggle {
//     font-size: 0;
//   }
// }

// </style>
