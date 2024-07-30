<script setup>
import HeaderCart from './HeaderCart.vue'
import CartItem from './CartItem.vue'
import axios from 'axios'
import { inject, onMounted, provide, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const closeDrawer = inject('closeDrawer')
const router = useRouter()
const items = ref([])
const isUserAuteh = () => {
  const userId = localStorage.getItem('userId')
  return userId !== null
}

const fetchAdded = async () => {
  if (!isUserAuteh()) {
    return []
  }
  try {
    const { data: added } = await axios.get(`https://0ea57de40f9742ea.mokky.dev/basket`)
    console.log(added)
    return added
  } catch (error) {
    console.log(error)
    return []
  }
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
  } catch (error) {
    console.log(error)
  }
}

const onClickAdd = async (item) => {
  if (!isUserAuteh()) {
    alert('Чтоб добавить товар в корзину нужно пройти регистрацию!')
    router.push('/profile')
    return []
  }
  try {
    if (!item.isAdded) {
      const userId = JSON.parse(localStorage.getItem('userId'))
      const obj = { sneakerId: item.id, userId }
      const { data } = await axios.post('https://0ea57de40f9742ea.mokky.dev/basket', obj)
      item.isAdded = true
      item.basketId = data.id
    } else {
      await axios.delete(`https://0ea57de40f9742ea.mokky.dev/basket/${item.basketId}`)
      item.isAdded = false
    }
  } catch (error) {
    console.log(error)
  }
}

const onClickDelete = async (sneakerId) => {
  try {
    const basket = items.value.find((item) => item.id === sneakerId && item.isAdded)
    if (basket) {
      const basketId = basket.basketId
      await axios.delete(`https://0ea57de40f9742ea.mokky.dev/basket/${basketId}`)
      items.value = items.value.filter((item) => item.id != sneakerId)
    }
  } catch (error) {
    console.log(error)
  }
}

const totalAmount = computed(() => {
  if (!isUserAuteh()) {
    return 0
  }

  return items.value.reduce((sum, item) => {
    return sum + (item.isAdded ? item.price : 0)
  }, 0)
})

provide('onClickDelete', onClickDelete)
onMounted(() => {
  fetchItems()
})
</script>

<template>
  <div class="bg-black h-full w-full fixed top-0 left-0 z-10 opacity-70" @click="closeDrawer"></div>
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
        >
          Оформить заказ
          <img src="/arrow-next.svg" alt="Arrow" />
        </button>
      </div>
    </div>
  </div>
</template>
