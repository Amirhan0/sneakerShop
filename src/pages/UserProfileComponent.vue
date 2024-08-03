<template>
  <div class="p-8 bg-white shadow-md rounded-lg">
    <h1 class="text-3xl font-bold mb-4">Профиль пользователя</h1>
    <div class="mb-4">
      <p class="font-medium text-xl">
        Имя пользователя:
        <span class="cl-8BB43C">
          {{ user.username }}
        </span>
      </p>
    </div>
    <div class="mb-4">
      <p class="font-medium text-xl">
        Email:
        <span class="cl-8BB43C">
          {{ email }}
        </span>
      </p>
    </div>
    <div class="mb-4">
      <p class="font-medium text-xl">Аватарка</p>
      <img :src="avatarUrl" class="w-32 h-32 rounded-full mb-4" />
      <input type="file" @change="handleFileChange" />
    </div>
    <div class="flex justify-end">
      <p class="cursor-pointer text-slate-400" @click="logOut">Выйти</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref({})
const email = ref('')
const avatarUrl = ref('')
const fileName = ref('')
const userId = JSON.parse(localStorage.getItem('userId'))

onMounted(async () => {
  try {
    const response = await axios.get(`https://b6024bc21b8a6872.mokky.dev/avatar`)
    const avatar = response.data.avatar
    avatarUrl.value = avatar
    localStorage.setItem('avatarUrl', avatar)
  } catch (error) {
    console.log(error)
  }

  const storedUser = localStorage.getItem('user')
  const storedEmail = localStorage.getItem('email')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
   email.value = storedEmail || ''
    avatarUrl.value = localStorage.getItem('avatarUrl') || ''
  }
})
const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = async (e) => {
      avatarUrl.value = e.target.result
      localStorage.setItem('avatarUrl', avatarUrl.value)
      try {
        const { data } = await axios.post('https://b6024bc21b8a6872.mokky.dev/avatar', {
          userId: userId,
          avatar: avatarUrl.value
        })
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    reader.readAsDataURL(file)
    fileName.value = file
  }
}

const logOut = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('avatarUrl')
  localStorage.removeItem('email')
  localStorage.removeItem('userId')
  router.push('/')
}
</script>

<style scoped>
.bg-A5D364 {
  background-color: #a5d364;
}
.cl-8BB43C {
  color: #8bb43c;
}
</style>
