<template>
  <div
    class="bg-black h-full w-full fixed top-0 left-0 z-10 opacity-70"
    v-if="openSideBar"
    @click="toggleSideBar"
  ></div>
  <div
    class="w-72 fixed top-0 left-0 z-20 bg-gray-800 text-white p-10 h-full transition-transform transform"
    :class="{ '-translate-x-full': !openSideBar }"
  >
    <div class="flex flex-row justify-end">
      <svg
        width="24"
        height="24"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        @click="toggleSideBar"
        class="cursor-pointer"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z"
          fill="#fff"
        ></path>
      </svg>
    </div>
    <ul class="flex flex-col mt-4">
      <li
        class="cursor-pointer font-medium text-xl block p-2 rounded hover:bg-gray-700"
        @click="navigatePath('/dashboard')"
      >
        Главная
      </li>

      <li
        class="block p-2 rounded hover:bg-gray-700 cursor-pointer font-medium text-xl"
        @click="navigatePath('/users')"
      >
        Пользователи
      </li>

      <li
        class="block p-2 rounded hover:bg-gray-700 cursor-pointer font-medium text-xl"
        @click="navigatePath('/orders')"
      >
        Заказы
      </li>
      <li
        class="block p-2 rounded hover:bg-gray-700 cursor-pointer font-medium text-xl"
        @click="navigatePath('/addcart')"
      >
        Добавить товар
      </li>
    </ul>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'
const toggleSideBar = inject('toggleSideBar')
const openSideBar = inject('openSideBar')

const router = useRouter()

const navigatePath = (path) => {
  router.push(path)
  toggleSideBar()
}
</script>

<style scoped></style>
