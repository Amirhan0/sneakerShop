<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl cl-8BB43C font-bold text-center mb-6">Войти</h2>
      <form @submit.prevent="autorizhation">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="email">Электронная почта</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
          <p v-if="errors.email" class="text-red-500">
            {{ errors.email }}
          </p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="password">Пароль</label>
          <input
            v-model="form.passwordUser"
            type="password"
            id="password"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
          <p v-if="errors.passwordUser" class="text-red-500">
            {{ errors.passwordUser }}
          </p>
        </div>
        <div class="mb-4">
          <p class="text-gray-700 mb-2">
            Нет профиля?<router-link to="/profile">
              <span class="cursor-pointer cl-8BB43C"> Зарегистрироваться</span></router-link
            >
          </p>
        </div>
        <button type="submit" class="w-full bg-A5D364 text-white p-2 rounded hover:bg-blue-600">
          Войти
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
  email: '',
  passwordUser: ''
})

const errors = reactive({
  email: '',
  passwordUser: ''
})

const validate = () => {
  let valid = true
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email) {
    errors.email = 'Email обязателен'
    valid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Некорректно введен email'
    valid = false
  } else {
    errors.email = ''
  }

  if (!form.passwordUser) {
    errors.passwordUser = 'Пароль обязателен'
    valid = false
  } else if (form.passwordUser.length < 6) {
    errors.passwordUser = 'Пароль должен содержать не менее 6 символов'
    valid = false
  } else {
    errors.passwordUser = ''
  }
  return valid
}
const userAutorizhation = async () => {
  try {
    const response = await axios.get('https://b6024bc21b8a6872.mokky.dev/users', {
      params: {
        email: form.email,
        passwordUser: form.passwordUser
      }
    })

    const user = response.data.find(
      (user) => user.email === form.email && user.passwordUser === form.passwordUser
    )

    if (user) {
      const userData = {
        username: user.username,
        email: user.email,
        passwordUser: user.passwordUser
      }

      if (userData.username && userData.email && userData.passwordUser) {
        localStorage.setItem('user', JSON.stringify({ username: user.username }))
        localStorage.setItem('email', user.email)
        localStorage.setItem('userId', user.id)
        return userData
      } else {
        console.log('Пользовательские данные некорректны')
        return null
      }
    } else {
      console.log('Пользователь не найден или неверный пароль')
      return null
    }
  } catch (error) {
    console.log('Ошибка при авторизации:', error)
    return null
  }
}

const autorizhation = async () => {
  if (validate()) {
    const userEx = await userAutorizhation()
    if (userEx) {
      console.log('Успешно')
      router.push('/')
    } else {
      console.log('Безуспешно')
    }
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
