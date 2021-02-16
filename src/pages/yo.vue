<script setup lang='ts'>
import { ref } from 'vue'

const inputTextValue = ref('')
const inputPasswordValue = ref('')
const inputNumberValue = ref(0)

const liked = ref(false)
</script>

<template>
  <div class="flex flex-col flex-wrap items-center justify-center gap-4 h-min">
    <YoBox title="buttons" class="flex gap-4">
      <YoButton type="primary">
        Primary
      </YoButton>
      <YoButton type="warning">
        Warning
      </YoButton>
      <YoButton type="danger">
        Danger
      </YoButton>
      <YoButton type="success">
        Success
      </YoButton>
      <LikeButton />
    </YoBox>
    <YoBox title="disabled buttons" class="flex gap-4">
      <YoButton disabled type="primary">
        Primary
      </YoButton>
      <YoButton disabled type="warning">
        Warning
      </YoButton>
      <YoButton disabled type="danger">
        Danger
      </YoButton>
      <YoButton disabled type="success">
        Success
      </YoButton>
      <LikeButton disabled />
    </YoBox>
    <YoBox title="inputs" class="w-full max-w-lg " content-class="grid items-end grid-cols-2 gap-y-8 gap-x-2">
      <InputWrap title="Text">
        <InputText v-model="inputTextValue" placeholder="Input text" />
      </InputWrap>
      <span class="mb-2.5 overflow-hidden overflow-ellipsis text">{{ inputTextValue }}</span>
      <InputWrap title="Number">
        <InputNumber v-model="inputNumberValue" placeholder="Input number" />
      </InputWrap>
      <span class="mb-2.5 overflow-hidden overflow-ellipsis text">{{ inputNumberValue }}</span>
      <InputWrap title="Password">
        <InputPassword v-model="inputPasswordValue" placeholder="Input password" />
      </InputWrap>
      <span class="mb-2.5 overflow-hidden overflow-ellipsis text">{{ inputPasswordValue }}</span>
      <!-- <label>
        <InputText v-model="inputTextValue" placeholder="text" />
        <span>{{ inputTextValue }}</span>
      </label>
      <label>
        <InputNumber v-model="inputNumberValue" placeholder="number" />
        <span>{{ inputNumberValue }}</span>
      </label>
      <label>
        <InputPassword v-model="inputPasswordValue" placeholder="password" />
        <span>{{ inputPasswordValue }}</span>
      </label> -->
    </YoBox>
    <YoBox title="inputs" class="w-full max-w-lg " content-class="flex gap-4">
      <LikeButton :liked="liked" />
    </YoBox>

    <yo-section title="Box">
      <yo-box>some content</yo-box>
    </yo-section>

    <yo-section class="w-60" title="Cards">
      <div class="flex flex-col gap-4">
        <yo-box>lorem</yo-box>
        <yo-box>ipsum</yo-box>
        <yo-box>dolor</yo-box>
      </div>
    </yo-section>
  </div>
</template>
