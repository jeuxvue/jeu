<script setup lang='ts'>
import { ref } from 'vue'

const inputTextValue = ref('')
const inputPasswordValue = ref('')
const inputNumberValue = ref(0)
const liked = ref(false)

</script>

<template>
  <div class="flex justify-center gap-16">
    <div class="flex flex-col flex-wrap items-center justify-center gap-8 h-min">
      <YoSection class="w-60" title="Cards">
        <div class="flex flex-col gap-4">
          <YoBox>lorem</YoBox>
          <YoBox>ipsum</YoBox>
          <YoBox>dolor</YoBox>
        </div>
      </YoSection>
    </div>
    <div class="flex flex-col flex-wrap gap-8 h-min">
      <YoSection title="buttons">
        <YoBox class="flex gap-4">
          <button class="btn btn-primary">
            Primary
          </button>
          <button class="btn btn-warning">
            Warning
          </button>
          <button class="btn btn-danger">
            Danger
          </button>
          <button class="btn btn-success">
            Success
          </button>
          <button disabled class="btn btn-primary">
            Primary
          </button>
          <LikeButton />
        </YoBox>
      </YoSection>
      <YoSection title="Platform tag">
        <YoBox class="flex gap-4">
          <PlatformTag name="Xbox" />
          <PlatformTag name="PlayStation" />
          <PlatformTag name="Nintendo" />
          <PlatformTag name="PC" />
        </YoBox>
      </YoSection>
      <YoSection title="inputs">
        <YoBox class="w-full max-w-lg " content-class="grid items-end grid-cols-2 gap-y-8 gap-x-2">
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
        </YoBox>
      </YoSection>
      <YoSection title="inputs">
        <YoBox class="w-full max-w-lg" content-class="flex gap-4">
          <LikeButton :liked="liked" />
        </YoBox>
      </YoSection>
      <YoSection title="Studios">
        <div class="flex flex-col gap-4">
          <YoCard :data="{name:'test', image:'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-979nF8TZP2xC.jpg'}" />
        </div>
      </YoSection>
      <YoSection title="Game card">
        <div class="flex gap-4">
          <GameCard name="The Witcher 3: Wild Hunt" image="https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg" />
          <GameCard name="Battlefield 1" image="https://media.rawg.io/media/games/998/9980c4296f311d8bcc5b451ca51e4fe1.jpg" />
          <GameCard name="Minecraft" image="https://media.rawg.io/media/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg" />
        </div>
      </YoSection>
    </div>
  </div>
</template>
