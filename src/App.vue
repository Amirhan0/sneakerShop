<script setup>
import Header from './components/HeaderComponent.vue'
import { ref, provide, onMounted, computed, watch } from 'vue'
import Drawer from './components/DrawerComponent.vue'
import axios from 'axios'
const openCart = ref(false)
const openDrawer = () => {
  openCart.value = true
}

const closeDrawer = () => {
  openCart.value = false
}
const items = ref([])

const totalAmount = ref(0)

const calculateTotalAmount = () => {
  totalAmount.value = items.value.reduce((sum, item) => {
    return sum + (item.isAdded ? item.price : 0)
  }, 0)
}

const fetchItems = async () => {
  try {
    const { data: allItems } = await axios.get('https://269b3b45e08bcd1a.mokky.dev/items')
    const baskets = await fetchAdded()

    const updatedItems = allItems
      .filter((item) => baskets.some((basket) => basket.sneakerId === item.id))
      .map((item) => {
        const basket = baskets.find((basket) => basket.sneakerId === item.id)
        return {
          ...item,
          isAdded: true,
          basketId: basket ? basket.id : null
        }
      })

    items.value = updatedItems
    calculateTotalAmount()
  } catch (error) {
    console.log(error)
  }
}

const fetchAdded = async () => {
  try {
    const { data: added } = await axios.get(`https://0ea57de40f9742ea.mokky.dev/basket`)
    return added
  } catch (error) {
    console.log(error)
    return []
  }
}

watch(items, calculateTotalAmount, { deep: true })

onMounted(() => {
  fetchItems()
  fetchAdded()
})
provide('closeDrawer', closeDrawer)
</script>

<template>
  <Drawer v-if="openCart" />
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14 pb-2">
    <Header :openDrawer="openDrawer" :totalAmount="totalAmount" />
    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
