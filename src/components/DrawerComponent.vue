<template>
  <div>
    <div
      class="bg-black h-full w-full fixed top-0 left-0 z-10 opacity-70"
      @click="closeDrawer"
    ></div>
    <div class="w-96 fixed top-0 right-0 z-20 bg-white h-full p-10">
      <HeaderCart />
      <div class="flex flex-col h-full justify-between">
        <div class="flex flex-col gap-5">
          <div v-if="items.length === 0" class="text-center text-gray-500">
            <div class="flex flex-col items-center mt-40">
              <img src="/package-icon.png" alt="" />
              <h1 class="font-bold text-2xl text-black">Корзина пустая</h1>
              <p class="text-black opacity-40 font-medium">
                Добавьте хотя бы одну пару <br />
                кроссовок, чтобы сделать заказ.
              </p>
            </div>

            <button
              class="flex justify-center items-center gap-3 w-full py-3 mt-10 bg-lime-500 text-white rounded-xl transition active:bg-lime-700 hover:bg-lime-600"
              @click="closeDrawer"
            >
              Вернуться назад
              <img src="/arrow-next.svg" alt="Arrow" />
            </button>
          </div>
          <CartItem
            v-for="item in items"
            :key="item.id"
            :id="item.id"
            :image="item.imageUrl"
            :name="item.title"
            :price="item.price"
          />
        </div>

        <div v-if="items.length > 0">
          <div class="flex flex-col gap-5">
            <div class="flex items-end gap-2">
              <span>Итого:</span>
              <div class="flex-1 border-b border-dashed" />
              <span class="font-bold">{{ totalAmount }}</span>
            </div>

            <div class="flex items-end gap-2">
              <span>Налог 5%:</span>
              <div class="flex-1 border-b border-dashed" />
              <span class="font-bold">{{ (totalAmount * 0.05).toFixed(2) }}</span>
            </div>
          </div>

          <button
            class="flex justify-center items-center gap-3 w-full py-3 mt-10 bg-lime-500 text-white rounded-xl transition active:bg-lime-700 hover:bg-lime-600"
            @click="openModal"
          >
            Оформить заказ
            <img src="/arrow-next.svg" alt="Arrow" />
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-30"
    >
      <div class="bg-white p-6 rounded-lg w-1/3">
        <h2 class="text-2xl font-bold mb-4">Оформление заказа</h2>
        <form @submit.prevent="submitOrder">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Имя:</label>
            <input
              v-model="orderDetails.name"
              type="text"
              class="input input-bordered w-full"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Адрес:</label>
            <input
              v-model="orderDetails.address"
              type="text"
              class="input input-bordered w-full"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Сумма:</label>
            <input
              v-model="totalAmountFormatted"
              type="text"
              class="input input-bordered w-full"
              disabled
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary flex justify-center items-center gap-3 w-full py-3 mt-10 bg-lime-500 text-white rounded-xl transition active:bg-lime-700 hover:bg-lime-600"
          >
            Подтвердить заказ
          </button>
          <button type="button" @click="closeModal" class="btn btn-secondary w-full mt-2">
            Закрыть
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderCart from './HeaderCart.vue'
import CartItem from './CartItem.vue'
import axios from 'axios'
import { inject, onMounted, ref, computed, provide } from 'vue'
import { useRouter } from 'vue-router'

const closeDrawer = inject('closeDrawer')
const router = useRouter()
const items = ref([])
const showModal = ref(false)
const orderDetails = ref({ name: '', address: '' })
const userId = JSON.parse(localStorage.getItem('userId'))

const isUserAuthenticated = () => userId !== null

const fetchAdded = async () => {
  if (!isUserAuthenticated()) return []
  try {
    const { data: added } = await axios.get('https://0ea57de40f9742ea.mokky.dev/basket', { params: { userId } })
    return added
  } catch (error) {
    console.error('Error fetching added items:', error)
    return []
  }
}

const fetchItems = async () => {
  try {
    const { data: allItems } = await axios.get('https://269b3b45e08bcd1a.mokky.dev/items')
    const baskets = await fetchAdded()

    items.value = allItems
      .filter(item => baskets.some(basket => basket.sneakerId === item.id))
      .map(item => {
        const basket = baskets.find(basket => basket.sneakerId === item.id)
        return {
          ...item,
          isAdded: !!basket,
          basketId: basket ? basket.id : null
        }
      })
  } catch (error) {
    console.error('Error fetching items:', error)
  }
}

const onClickAdd = async (item) => {
  if (!isUserAuthenticated()) {
    alert('Чтобы добавить товар в корзину, нужно пройти регистрацию!')
    router.push('/profile')
    return
  }

  try {
    if (!item.isAdded) {
      const obj = { sneakerId: item.id, userId }
      const { data } = await axios.post('https://0ea57de40f9742ea.mokky.dev/basket', obj)
      item.isAdded = true
      item.basketId = data.id
    } else {
      await axios.delete(`https://0ea57de40f9742ea.mokky.dev/basket/${item.basketId}`, { params: { userId } })
      item.isAdded = false
    }
  } catch (error) {
    console.error('Error adding/removing item from basket:', error)
  }
}

const onClickDelete = async (sneakerId) => {
  try {
    const basket = items.value.find(item => item.id === sneakerId && item.isAdded)
    if (basket) {
      await axios.delete(`https://0ea57de40f9742ea.mokky.dev/basket/${basket.basketId}`, { params: { userId } })
      items.value = items.value.filter(item => item.id !== sneakerId)
    }
  } catch (error) {
    console.error('Error deleting item from basket:', error)
  }
}

const clearBasket = async () => {
  try {
    const baskets = await fetchAdded()
    await Promise.all(baskets.map(basket => 
      axios.delete(`https://0ea57de40f9742ea.mokky.dev/basket/${basket.id}`, { params: { userId } })
    ))
    items.value = []
  } catch (error) {
    console.error('Error clearing basket:', error)
  }
}

const totalAmount = computed(() => {
  if (!isUserAuthenticated()) return 0
  return items.value.reduce((sum, item) => sum + (item.isAdded ? item.price : 0), 0)
})

const totalAmountFormatted = computed(() => totalAmount.value.toFixed(2))

const openModal = () => showModal.value = true
const closeModal = () => showModal.value = false

const submitOrder = async () => {
  try {
    const order = {
      name: orderDetails.value.name,
      address: orderDetails.value.address,
      totalAmount: totalAmount.value
    }
    await axios.post('https://b90d7072ae3a46c0.mokky.dev/orders', order)
    await clearBasket() 
    alert('Заказ успешно оформлен!')
    closeModal()
  } catch (error) {
    console.error('Error submitting order:', error)
    alert('Произошла ошибка при оформлении заказа.')
  }
}

onMounted(() => {
  fetchItems()
})

provide('onClickDelete',onClickDelete)
</script>

<style scoped></style>
