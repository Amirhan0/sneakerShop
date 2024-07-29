<template>
  <div class="p-8 bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-bold mb-4">Профиль пользователя</h1>
    <p><strong>Имя:</strong> {{ user.username }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const user = ref({})

onMounted(() => {
  const username = route.params.username
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
})
</script>
