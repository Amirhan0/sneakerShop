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
          {{ email.email }}
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref({})
const email = ref({})
const avatarUrl = ref('')
const fileName = ref('')

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  const storedEmail = localStorage.getItem('email')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
    email.value = JSON.stringify(storedEmail)
    avatarUrl.value = localStorage.getItem('avatarUrl') || ''
  }
})
const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarUrl.value = e.target.result
      localStorage.setItem('avatarUrl', avatarUrl.value)
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
