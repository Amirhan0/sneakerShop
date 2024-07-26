<template>
  <h2 class="font-bold text-2xl">Закладки</h2>

  <div v-if="items.length === 0">
    <div class="flex flex-col items-center">
      <img src="/emoji-2.png" alt="" />
      <h1 class="font-bold text-2xl">Закладок нет :c</h1>
      <p class="font-medium opacity-50 pt-4">Вы ничего не добавляли в закладки</p>

      <router-link to="/">
        <button
          class="flex justify-center items-center gap-3 w-60 py-3 mt-10 bg-lime-500 text-white rounded-xl transition active:bg-lime-700 hover:bg-lime-600"
        >
          Вернуться назад
          <img src="/arrow-next.svg" alt="Arrow" />
        </button>
      </router-link>
    </div>
  </div>

  <div
    class="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5"
    v-auto-animate
  >
    <Card
      class="mr-5"
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :image="item.imageUrl"
      :name="item.title"
      :price="item.price"
      :isAdded="item.isAdded"
      :isFavorite="item.isFavorite"
      @clickFavorite="addToFavorite(item)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Card from '../components/CardItem.vue'
import axios from 'axios'

const items = ref([])

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://269b3b45e08bcd1a.mokky.dev/favorites')
    return favorites
  } catch (error) {
    console.log(error)
    return []
  }
}

const fetchItems = async () => {
  try {
    const { data: allItems } = await axios.get('https://269b3b45e08bcd1a.mokky.dev/items')
    const favorites = await fetchFavorites()
    const updatedItems = allItems.filter((item) =>
      favorites.some((fav) => fav.sneakerId === item.id)
    )
    items.value = updatedItems.map((item) => {
      const favorite = favorites.find((fav) => fav.sneakerId === item.id)
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite ? favorite.id : null
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = { sneakerId: item.id }
      const { data } = await axios.post('https://269b3b45e08bcd1a.mokky.dev/favorites', obj)
      item.isFavorite = true
      item.favoriteId = data.id
    } else {
      if (item.favoriteId) {
        await axios.delete(`https://269b3b45e08bcd1a.mokky.dev/favorites/${item.favoriteId}`)
        item.isFavorite = false
        item.favoriteId = null
      } else {
        console.log('Favorite ID is missing, cannot delete.')
      }
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchItems()
})
</script>

<style scoped></style>
