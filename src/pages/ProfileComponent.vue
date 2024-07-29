<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl cl-8BB43C font-bold text-center mb-6">Регистрация</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="username">Имя пользователя</label>
          <input
            v-model="form.username"
            type="text"
            id="username"
            autocomplete="form.username"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
          <p v-if="errors.username" class="text-red-500">
            {{ errors.username }}
          </p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="email">Электронная почта</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            autocomplete="email"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
          <p v-if="errors.email" class="text-red-500">
            {{ errors.email }}
          </p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="passwordUser">Пароль</label>
          <input
            v-model="form.passwordUser"
            type="password"
            id="password"
            autocomplete="password"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
          <p v-if="errors.passwordUser" class="text-red-500">
            {{ errors.passwordUser }}
          </p>
        </div>
        <div class="mb-4">
          <p class="text-gray-700 cursor-pointer">
            Уже есть профиль?
            <router-link to="/login">
              <span class="cl-8BB43C cursor-pointer">Войти</span>
            </router-link>
          </p>
        </div>
        <button type="submit" class="w-full bg-A5D364 text-white p-2 rounded hover:bg-blue-600">
          Зарегистрироваться
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  username: '',
  passwordUser: '',
  email: ''
})

const errors = reactive({
  username: '',
  passwordUser: '',
  email: ''
})

const validate = () => {
  let valid = true

  if (!form.username) {
    errors.username = 'Имя пользователя обязательно'
    valid = false
  } else {
    errors.username = ''
  }

  if (!form.passwordUser) {
    errors.passwordUser = 'Пароль обязателен'
    valid = false
  } else if (form.passwordUser.length < 6) {
    errors.passwordUser = 'Пароль должен содержать больше 6 символов.'
    valid = false
  } else {
    errors.passwordUser = ''
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email) {
    errors.email = 'E-mail обязателен'
    valid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Некорректный формат email-a'
    valid = false
  } else {
    errors.email = ''
  }

  return valid
}

const userRegistration = async () => {
  try {
    const response = await axios.post('https://b6024bc21b8a6872.mokky.dev/users', {
      username: form.username,
      email: form.email,
      passwordUser: form.passwordUser
    })
    localStorage.setItem('user', JSON.stringify({ username: response.data.username }))
    console.log(response.data)
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}

const register = () => {
  if (validate()) {
    userRegistration()
  }
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
