<template>
  <div class="flex">
    <main class="flex-1 p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white p-4 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold">Пользователи</h3>
          <p class="mt-2 text-gray-600">Количество пользователей: 120</p>
          <div class="mt-4">
            <router-link to="/users" class="btn btn-primary">Просмотреть пользователей</router-link>
          </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold">Заказы</h3>
          <p class="mt-2 text-gray-600">Количество заказов: 45</p>
          <div class="mt-4">
            <router-link to="/orders" class="btn btn-primary">Просмотреть заказы</router-link>
          </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold">Товары</h3>
          <p class="mt-2 text-gray-600">Количество товаров: 12</p>
          <div class="mt-4">
            <router-link to="/addcart" class="btn btn-primary">Просмотреть товары</router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>

</script>

<style scoped></style>
