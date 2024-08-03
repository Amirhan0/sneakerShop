<template>
  <header class="flex justify-between border-b border-slate-300 px-10 py-5">
    <router-link to="/">
      <div class="flex gap-4 items-center">
        <img class="w-10" src="/logo.png" alt="Logo" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-400">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>
    <ul class="flex items-center gap-10">
      <li
        @click="openDrawer"
        class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="" />
        <b>{{ totalAmount }}.тг</b>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
          <img src="/heart.svg" alt="" />
          <span>Закладки</span>
        </li>
      </router-link>
      <template v-if="user">
        <router-link :to="`/profile/${user.username}`">
          <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
            <img :src="avatarUrl" class="w-12 h-12" alt="" />
            <span>{{ user.username }}</span>
          </li>
        </router-link>
      </template>
      <template v-else>
        <router-link to="/login">
          <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
            <img src="/profile.svg" alt="" />
            <span>Профиль</span>
          </li>
        </router-link>
      </template>
    </ul>
  </header>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  totalAmount: Number,
  openDrawer: Function
})

const user = ref(null)
const avatarUrl = ref('')
const userId = JSON.parse(localStorage.getItem('userId'))

const updateUser = async () => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
    if (userId) {
      try {
        const response = await axios.get(`https://b6024bc21b8a6872.mokky.dev/avatar/${userId}`)
        const avatar = response.data.avatar
        avatarUrl.value = avatar
        localStorage.setItem('avatarUrl', avatar)
      } catch (error) {
        console.error('Error fetching avatar:', error)
      }
    } else {
      avatarUrl.value = localStorage.getItem('avatarUrl') || ''
    }
  } else {
    user.value = null
    avatarUrl.value = ''
  }
}

onMounted(() => {
  updateUser()
})

watch(() => localStorage.getItem('userId'), updateUser)
</script>
