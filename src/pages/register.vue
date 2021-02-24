<script setup lang='ts'>
import { useStore, Actions, Mutations } from '@/store'
const store = useStore()

store.dispatch(Actions.register)
store.commit(Mutations.setUser)
</script>

<template>
  <YoBox class='mx-auto mt-40 w-80'>
    <form action='/register' method='post'>
      <label class='block space-y-2'>
        <h2>username</h2>
        <InputText name='username' class='w-full' />
      </label>
      <label class='block mt-4 space-y-2'>
        <h2>password</h2>
        <InputPassword name='password' class='w-full' />
      </label>
      <button class='w-full mt-8 btn btn-primary'>
        Register
      </button>
    </form>
  </YoBox>
</template>
