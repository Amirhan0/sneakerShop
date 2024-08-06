<template>
  <div class="p-6">
    <section id="users" class="mt-8">
      <h2 class="text-xl font-bold mb-4">Пользователи</h2>
      <table class="table-auto w-full border border-gray-300">
        <thead>
          <tr>
            <th class="border border-gray-300 p-2">ID</th>
            <th class="border border-gray-300 p-2">Имя</th>
            <th class="border border-gray-300 p-2">Электронная почта</th>
            <th class="border border-gray-300 p-2">Пароль</th>
            <th class="border border-gray-300 p-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="border border-gray-300 p-2">{{ user.id }}</td>
            <td class="border border-gray-300 p-2">{{ user.username }}</td>
            <td class="border border-gray-300 p-2">{{ user.email }}</td>
            <td class="border border-gray-300 p-2">{{ user.passwordUser }}</td>
            <td class="border border-gray-300 p-2">
              <button class="btn btn-error" @click="usersDelete(user.id)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const users = ref([])

const usersInformation = async () => {
  try {
    const response = await axios.get('https://b6024bc21b8a6872.mokky.dev/users')
    users.value = response.data
  } catch (error) {
    console.log(error)
  }
}

const usersDelete = async (userId) => {
  try {
    await axios.delete(`https://b6024bc21b8a6872.mokky.dev/users/${userId}`)
    users.value = users.value.filter((user) => user.id !== userId)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  usersInformation()
  usersDelete()
})
</script>

<style scoped></style>
