<template>
  <div v-if="!statusAuthenticated" class="w-96 flex flex-col m-auto">
    <form @submit.prevent="autorizhation">
      <label class="input input-bordered flex items-center gap-2 m-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-4 w-4 opacity-70"
        >
          <path
            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
          />
        </svg>
        <input v-model="form.username" type="text" class="grow" placeholder="Имя пользователя" />
      </label>
      <label class="input input-bordered flex items-center gap-2 m-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-4 w-4 opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clip-rule="evenodd"
          />
        </svg>
        <input v-model="form.passwordUser" type="password" class="grow" placeholder="Пароль" />
      </label>
      <button type="submit" class="btn btn-primary m-2 flex flex-row">Войти</button>
      <p v-if="errors.username" class="text-red-500">{{ errors.username }}</p>
      <p v-if="errors.passwordUser" class="text-red-500">{{ errors.passwordUser }}</p>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const statusAuthenticated = ref(false)
const router = useRouter()
const form = reactive({
  username: '',
  passwordUser: ''
})

const errors = reactive({
  username: '',
  passwordUser: ''
})

const validate = () => {
  let valid = true

  if (!form.username) {
    errors.username = 'Имя пользователя не указано!'
    valid = false
  } else {
    errors.username = ''
  }

  if (!form.passwordUser) {
    errors.passwordUser = 'Пароль не указан'
    valid = false
  } else {
    errors.passwordUser = ''
  }
  return valid
}

const loginAdmin = async () => {
  try {
    const response = await axios.get('https://3715ddc906ee9013.mokky.dev/admin', {
      params: {
        username: form.username,
        passwordUser: form.passwordUser
      }
    })

    const user = response.data.find(
      (user) => user.username === form.username && user.passwordUser === form.passwordUser
    )
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

const autorizhation = async () => {
  if (validate()) {
    const user = await loginAdmin()
    if (user) {
      console.log('Успешно')
      localStorage.setItem('statusAuthenticated', 'true')
      statusAuthenticated.value = true
      router.push('/dashboard')
    } else {
      localStorage.setItem('statusAuthenticated', 'false')
      errors.username = 'Неверное имя пользователя или пароль'
      errors.passwordUser = ''
    }
  }
}

onMounted(() => {
  const authStatus = localStorage.getItem('statusAuthenticated')
  if (authStatus) {
    statusAuthenticated.value = authStatus === 'true'
    router.push('/dashboard')
  }
})
</script>

<style scoped></style>
