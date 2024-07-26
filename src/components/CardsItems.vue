<script setup>
import Card from './CardItem.vue'
defineProps({
  items: Array
})

const emit = defineEmits(['addToFavorite', 'onClickAdd'])

const onClickAdd = () => {
  alert('Добавлено')
}
</script>

<template>
  <div
    class="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5"
    v-auto-animate
  >
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :image="item.imageUrl"
      :name="item.title"
      :price="item.price"
      :isAdded="item.isAdded"
      :isFavorite="item.isFavorite"
      :onClickAdd="() => emit('onClickAdd', item)"
      :onClickFavorite="() => emit('addToFavorite', item)"
    />
  </div>
</template>
