<template>
  <div class="flex">
    <main class="flex-1 p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white p-4 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold">Пользователи</h3>
          <p class="mt-2 text-gray-600">Количество пользователей: {{ users.length }}</p>
          <div class="mt-4">
            <router-link to="/users" class="btn btn-primary">Просмотреть пользователей</router-link>
          </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold">Заказы</h3>
          <p class="mt-2 text-gray-600">Количество заказов: {{ orders.length }}</p>
          <div class="mt-4">
            <router-link to="/orders" class="btn btn-primary">Просмотреть заказы</router-link>
          </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold">Товары</h3>
          <p class="mt-2 text-gray-600">Количество товаров: {{ product.length }}</p>
          <div class="mt-4">
            <router-link to="/addcart" class="btn btn-primary">Просмотреть товары</router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
const users = ref([])
const product = ref([])
const orders = ref([])
const usersInWebSite = async () => {
  try {
    const response = await axios.get('https://b6024bc21b8a6872.mokky.dev/users')
    users.value = response.data
  } catch (error) {
    console.log(error)
  }
}

const ordersInWebSite = async () => {
  try {
    const response = await axios.get('https://b90d7072ae3a46c0.mokky.dev/orders')
    orders.value = response.data
  } catch (error) {
    console.log(error)
  }
}

const productInWebSite = async () => {
  try {
    const response = await axios.get('https://269b3b45e08bcd1a.mokky.dev/items')
    product.value = response.data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  usersInWebSite()
  productInWebSite()
  ordersInWebSite()
})
</script>

<style scoped></style>
