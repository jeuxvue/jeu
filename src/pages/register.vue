<script setup lang='ts'>
import { useStore, Actions, Mutations } from '@/store'
const store = useStore()

store.dispatch(Actions.register)
store.commit(Mutations.setUser)
</script>

<template>
  <YoBox class="mx-auto mt-40 w-80">
    <form action="/register" method="post">
      <label class="block space-y-2">
        <h2>username</h2>
        <InputText name="username" class="w-full" />
      </label>
      <label class="block mt-4 space-y-2">
        <h2>password</h2>
        <InputPassword name="password" class="w-full" />
      </label>
      <button class="w-full mt-8 btn btn-primary">
        Register
      </button>
    </form>
    <p class="mt-8 mb-1 text-center">
      or use socials
    </p>
    <a href="#" class="inline-block w-full text-center text-gray-800 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 btn">
      <i-mdi-google class="mr-2" /><span>Auth with Google</span>
    </a>
  </YoBox>
</template>
