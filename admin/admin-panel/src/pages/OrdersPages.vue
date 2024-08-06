<template>
  <div class="p-6">
    <section id="orders" class="mt-8">
      <h2 class="text-xl font-bold mb-4">Заказы</h2>
      <table class="table-auto w-full border border-gray-300">
        <thead>
          <tr>
            <th class="border border-gray-300 p-2">ID</th>
            <th class="border border-gray-300 p-2">Клиент</th>
            <th class="border border-gray-300 p-2">Сумма</th>
            <th class="border border-gray-300 p-2">Адрес</th>
            <th class="border border-gray-300 p-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id" :class="{ 'line-through': order.isAccepted }">
            <td class="border border-gray-300 p-2">{{ order.id }}</td>
            <td class="border border-gray-300 p-2">{{ order.name }}</td>
            <td class="border border-gray-300 p-2">{{ order.totalAmount }}</td>
            <td class="border border-gray-300 p-2">{{ order.address }}</td>
            <td class="border border-gray-300 p-2">
              <button class="btn btn-secondary mr-2" @click="ordersAccept(order.id)">
                Принять
              </button>
              <button class="btn btn-error" @click="ordersDelete(order.id)">Удалить</button>
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

const orders = ref([])

const ordersInformation = async () => {
  try {
    const response = await axios.get('https://b90d7072ae3a46c0.mokky.dev/orders')
    orders.value = response.data
  } catch (error) {
    console.log(error)
  }
}

const ordersDelete = async (ordersId) => {
  try {
    await axios.delete(`https://b90d7072ae3a46c0.mokky.dev/orders/${ordersId}`)
    orders.value = orders.value.filter((order) => order.id !== ordersId)
  } catch (error) {
    console.log(error)
  }
}

const ordersAccept = async (ordersId) => {
  try {
    await axios.patch(`https://b90d7072ae3a46c0.mokky.dev/orders/${ordersId}`, { isAccepted: true })
    const updateOrders = orders.value.map((order) =>
      order.id === ordersId ? { ...order, isAccepted: true } : order
    )
    orders.value = updateOrders
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  ordersDelete()
  ordersInformation()
})
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
