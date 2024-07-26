<script setup>
import { inject } from 'vue'

const onClickDelete = inject('onClickDelete')

const props = defineProps({
  id: Number,
  image: String,
  name: String,
  price: Number,
  isAdded: Boolean,
  isFavorite: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function
})

const handDelete = () => {
  if (onClickDelete) {
    console.log(props.id)
    onClickDelete(props.id)
  }
}


</script>

<template>
  <div class="relative flex w-full border border-slate-100 rounded-xl p-4 gap-4">
    <img :src="image" class="w-16 h-16" alt="Sneaker" />
    <div class="flex flex-col w-full">
      <p>{{ name }}</p>
      <div class="flex justify-between mt-5">
        <span class="font-bold">{{ price }} тенге</span>
        <img
          @click="handDelete"
          class="cursor-pointer opacity-30 hover:opacity-100 transition"
          src="/close.svg"
          alt="Close"
        />
      </div>
    </div>
  </div>
</template>
